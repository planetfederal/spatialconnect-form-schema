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
  name: 'Sample Form',
  fields: [
    {
      "id": "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
      "is_required": true,
      "order" : 0,
      "key": "name",
      "name": "Name",
      "type": "string",
      "initial_value": "Frank",
      "minimum_length": "0",
      "maximum_length": "100"
    },
    {
      "id": "710b962e-041c-11e1-9234-0123456789ac",
      "key": "age",
      "name": "Age Label",
      "order" : 1,
      "type": "number",
      "is_integer": true,
      "initial_value": "0",
      "minimum": "0",
      "maximum": "200",
    },
    {
      "id": "710b962e-041c-11e1-9234-0123456789ab",
      "key": "age_label_2",
      "name": "Age Label 2",
      "order" : 3,
      "type": "number",
      "mode": "counter"
    },
    {
      "id": "710b962e-041c-11e1-9234-0123456789ad",
      "key": "label",
      "name": "Label",
      "order" : 2,
      "is_required": true,
      "type": "date",
    },
    {
      "id": "710b962e-041c-11e1-9234-0123456789ae",
      "key": "selectfield",
      "name": "Select Field",
      "order" : 4,
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
      "key": "name",
      "name": "Name",
      "required": true,
      "order" : 0,
      "type": "string",
      "initialValue": "Frank",
      "minLength": "0",
      "maxLength": "100"
    },
    "age": {
      "id": "710b962e-041c-11e1-9234-0123456789ac",
      "key": "age",
      "name": "Age Label",
      "order" : 1,
      "type": "number",
      "integer": true,
      "initialValue": "0",
      "minimum": "0",
      "maximum": "200",
    },
    "label": {
      "id": "710b962e-041c-11e1-9234-0123456789ad",
      "key": "label",
      "name": "Label",
      "order" : 2,
      "required": true,
      "type": "date"
    },
    "age_label_2": {
      "id": "710b962e-041c-11e1-9234-0123456789ab",
      "key": "age_label_2",
      "name": "Age Label 2",
      "order" : 3,
      "type": "number",
      "mode": "counter"
    },
    "selectfield": {
      "id": "710b962e-041c-11e1-9234-0123456789ae",
      "key": "selectfield",
      "name": "Select Field",
      "order" : 4,
      "type": "string",
      "enum": ["choice 1", "choice 2"]
    }
  },
  "required": ["name", "label"]
}

describe('sc-form-schema', () => {
  it('should validate', () => {
    expect(validate(scSchema).length).toEqual(0);
  });

  it('should create json-schema', () => {
    expect(translate(scSchema).schema).toEqual(tSchema);
  });
});
