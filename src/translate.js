import sortBy from 'lodash/sortBy';
import cloneDeep from 'lodash/cloneDeep';
import formtemplates from './formtemplates';

let fieldMap = {
  is_required: 'required',
  is_integer: 'integer',
  initial_value: 'initialValue',
  minimum_length: 'minLength',
  maximum_length: 'maxLength',
  exclusive_minimum: 'exclusiveMinimum',
  exclusive_maximum: 'exclusiveMaximum',
  options: 'enum',
  minimum: 'minimum',
  maximum: 'maximum',
  pattern: 'pattern',
};

function translate({ scSchema, onFocus }) {
  let schema = {
    type: 'object',
    required: [],
    properties: {},
  };
  let options = {
    auto: 'none',
    fields: {},
  };
  let fields = sortBy(cloneDeep(scSchema.fields), 'position');
  fields.forEach(field => {
    let label =
      (field.field_label ? field.field_label : 'Enter a Label') + (field.is_required ? ' *' : '');
    let fieldOptions = {
      label: label,
      underlineColorAndroid: 'transparent',
      onFocus: onFocus ? onFocus : () => {},
    };
    if (field.type == 'string' || field.type == 'number') {
      fieldOptions.template = formtemplates.text;
      fieldOptions.config = { fieldType: field.type };
    }
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
      fieldOptions.mode = 'time';
    }
    for (let key in fieldMap) {
      if (field.hasOwnProperty(key)) {
        field[fieldMap[key]] = field[key];
        delete field[key];
      }
      if (field.constraints && field.constraints.hasOwnProperty(key)) {
        field[fieldMap[key]] = field.constraints[key];
        delete field.constraints[key];
      }
    }
    delete field.constraints;
    schema.properties[field.field_key] = field;
    options.fields[field.field_key] = fieldOptions;
  });
  let initialValues = {};
  for (let prop in schema.properties) {
    if (schema.properties[prop].hasOwnProperty('initialValue')) {
      initialValues[prop] = schema.properties[prop].initialValue;
    }
  }
  schema.required = fields.filter(f => f.required).map(f => f.field_key);
  return { schema, options, initialValues };
}

export default translate;
