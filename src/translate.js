import _ from 'lodash';
import formtemplates from './formtemplates';

let fieldMap = {
  is_required: 'required',
  is_integer: 'integer',
  initial_value: 'initialValue',
  minimum_length: 'minLength',
  maximum_length: 'maxLength',
  exclusive_minimum: 'exclusiveMinimum',
  exclusive_maximum: 'exclusiveMaximum',
  options: 'enum'
};

function translate(scSchema) {
  let schema = {
    type: "object",
    required: [],
    properties: {}
  }
  let options = {
    auto: 'none',
    fields: {}
  };
  let fields = _.sortBy(_.cloneDeep(scSchema.fields), 'position');
  fields.forEach(field => {
    let fieldOptions = {
      label: (field.field_label ? field.field_label : 'Enter a Label') + (field.is_required ? ' *': '')
    };
    if (field.type == 'photo') {
      field.type = 'string';
      fieldOptions.template = formtemplates.photo;
      fieldOptions.config = field;
      fieldOptions.error = 'Photo is Required';
    }
    if (field.type == 'counter') {
      field.type = 'number';
      fieldOptions.template = formtemplates.counter;
      fieldOptions.config = field;
    }
    if (field.type == 'slider') {
      field.type = 'number';
      fieldOptions.template = formtemplates.slider;
      fieldOptions.config = field;
    }
    if (field.type == 'select') {
      field.type = 'string';
    }
    if (field.type == 'date') {
      fieldOptions.mode = 'date';
    }
    if (field.type == 'time') {
      fieldOptions.mode ='time';
    }
    for (let key in fieldMap) {
      if (field.hasOwnProperty(key)) {
        field[fieldMap[key]] = field[key];
        delete field[key];
      }
    }
    schema.properties[field.field_key] = field;
    options.fields[field.field_key] = fieldOptions;
  })
  schema.required = fields.filter(f => f.required).map(f => f.field_key);
  return { schema, options };
}

export default translate;