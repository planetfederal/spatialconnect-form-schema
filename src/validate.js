import { Validator } from 'jsonschema';
import _ from 'lodash';

let formSchema = {
  "id": "/SCForm",
  "type": "object",
  "properties": {
    "id": {"type": "number"},
    "form_key": {"type": "string", "minLength":1, "pattern": /^[a-z0-9_]*$/},
    "form_label": {"type": "string", "minLength":1},
    "fields": {
      "type": "array",
      "items": {"$ref": "/SCField"}
    }
  },
  "required": ["id", "form_label", "form_key", "fields"]
};

let fieldSchema = {
  "id": "/SCField",
  "type": "object",
  "properties": {
    "id": {"type": "number"},
    "field_key": {"type": "string", "minLength":1, "pattern": /^[a-z0-9_]*$/},
    "field_label": {"type": "string", "minLength":1},
    "is_required": {"type": "boolean"},
    "position": {"type": "number"},
    "type": {
      "type": "string",
      "oneOf": [
        {"type": "string", "pattern": /string/},
        {"type": "string", "pattern": /number/},
        {"type": "string", "pattern": /date/},
        {"type": "string", "pattern": /boolean/},
        {"type": "string", "pattern": /select/},
        {"type": "string", "pattern": /slider/},
        {"type": "string", "pattern": /counter/},
        {"type": "string", "pattern": /photo/}
      ]
    },
    "constraints": {
      "type": "object",
      "properties": {
        "initial_value": {"type": "string"},
        "minimum": {"type": "string", "minLength":1, "pattern": /^[0-9]*$/},
        "maximum": {"type": "string", "minLength":1, "pattern": /^[0-9]*$/},
        "exclusive_minimum": {"type": "string"},
        "exclusive_maximum": {"type": "string"},
        "is_integer": {"type": "boolean"},
        "minimum_length": {"type": "string"},
        "maximum_length": {"type": "string"},
        "pattern": {"type": "string"},
        "options": {"type": "array", "items": {"type": "string"}}
      }
    }
  },
  "required": ["id", "field_key", "field_label", "position", "type"]
};


//returns array of errors
function validate(scSchema) {
  let v = new Validator();
  v.addSchema(fieldSchema, '/SCField');
  let validationResult = v.validate(scSchema, formSchema);
  let errors = validationResult.errors;
  let fields = scSchema.fields;

  //no empty keys
  if (fields.filter(f => f.key === '').length) {
    errors.push({
      name: 'All fields',
      message: 'must have a Data Name attribute.'
    })
  }
  //no empty names
  if (fields.filter(f => f.label === '').length) {
    errors.push({
      name: 'All fields',
      message: 'must have a Display Name attribute.'
    });
  }
  //no duplicate keys
  let duplicateErrors = _.uniq(fields
    .filter(f => f.key)
    .filter(f => fields.filter(_f => f.id !== _f.id && f.key === _f.key).length)
    .map(f => f.key))
    .map(key => ({ name: key, message: 'contains a duplicate Data Name attribute.'}));

  errors = errors.concat(duplicateErrors);
  return errors;
}

export default validate;