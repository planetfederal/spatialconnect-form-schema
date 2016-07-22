import expect from 'expect';
import proxyquire from 'proxyquire';
var translate = proxyquire('../src/translate', {
  './formtemplates': {
    'slider': {},
    'counter': {},
    '@noCallThru': true
  }
}).default;
import validate from '../src/validate';

let scSchema = {
  id: 1,
  form_label: 'Sample Form',
  form_key: 'sample_form',
  fields: [
    {
      "id": "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
      "is_required": true,
      "position" : 0,
      "field_key": "name",
      "field_label": "Name",
      "type": "string",
      "initial_value": "Frank",
      "minimum_length": "0",
      "maximum_length": "100"
    },
    {
      "id": "710b962e-041c-11e1-9234-0123456789ac",
      "field_key": "age",
      "field_label": "Age Label",
      "position" : 1,
      "type": "number",
      "is_integer": true,
      "initial_value": "0",
      "minimum": "0",
      "maximum": "200",
    },
    {
      "id": "710b962e-041c-11e1-9234-0123456789ab",
      "field_key": "age_label_2",
      "field_label": "Age Label 2",
      "position" : 3,
      "type": "number",
      "mode": "counter"
    },
    {
      "id": "710b962e-041c-11e1-9234-0123456789ad",
      "field_key": "form_label",
      "field_label": "form_label",
      "position" : 2,
      "is_required": true,
      "type": "date",
    },
    {
      "id": "710b962e-041c-11e1-9234-0123456789ae",
      "field_key": "selectfield",
      "field_label": "Select Field",
      "position" : 4,
      "type": "select",
      "options": ["choice 1", "choice 2"]
    }
  ]
};

let tSchema = {
  "type": "object",
  "properties": {
    "name": {
      "id": "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
      "field_key": "name",
      "field_label": "Name",
      "required": true,
      "position" : 0,
      "type": "string",
      "initialValue": "Frank",
      "minLength": "0",
      "maxLength": "100"
    },
    "age": {
      "id": "710b962e-041c-11e1-9234-0123456789ac",
      "field_key": "age",
      "field_label": "Age Label",
      "position" : 1,
      "type": "number",
      "integer": true,
      "initialValue": "0",
      "minimum": "0",
      "maximum": "200",
    },
    "form_label": {
      "id": "710b962e-041c-11e1-9234-0123456789ad",
      "field_key": "form_label",
      "field_label": "form_label",
      "position" : 2,
      "required": true,
      "type": "date"
    },
    "age_label_2": {
      "id": "710b962e-041c-11e1-9234-0123456789ab",
      "field_key": "age_label_2",
      "field_label": "Age Label 2",
      "position" : 3,
      "type": "number",
      "mode": "counter"
    },
    "selectfield": {
      "id": "710b962e-041c-11e1-9234-0123456789ae",
      "field_key": "selectfield",
      "field_label": "Select Field",
      "position" : 4,
      "type": "string",
      "enum": ["choice 1", "choice 2"]
    }
  },
  "required": ["name", "form_label"]
}

describe('sc-form-schema', () => {
  it('should validate', () => {
    expect(validate(scSchema).length).toEqual(0);
  });

  it('should create json-schema', () => {
    expect(translate(scSchema).schema).toEqual(tSchema);
  });
});
