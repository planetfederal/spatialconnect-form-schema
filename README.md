Validates a SpatialConnect form schema and translates to a [tcomb-json-schema](https://github.com/gcanti/tcomb-json-schema).

# Install

`npm install spatialconnect-form-schema`

# API

## translate(form: SCForm): JSONSchema

**Example**

```js
import scformschema from 'spatialconnect-form-schema';
import transform from 'tcomb-json-schema';
import t from 'tcomb-form';

let form = {
  id: 2,
  version: 0,
  form_key: "baseball_team",
  form_label: "Baseball Team",
  fields: [{
    id: 13,
    type: "string",
    field_label: "Favorite?",
    field_key: "team",
    position: 0
  }, {
    id: 14,
    type: "string",
    field_label: "Why?",
    field_key: "why",
    position: 1
  }]
};

const App = React.createClass({
  render() {
    let { schema, options } = scformschema.translate(form);
    return (
      <form>
        <t.form.Form
          type={transform(schema)}
          options={options}
          />
      </form>
    )
  }
});

```

## validate(form: SCForm): Array

Validates a form schema and returns an array of errors.

**Example**

```js
let validationErrors = scformschema.validate(form);
```

## React Native

For use in React Native applications, import the native build

```js
import scformschema from 'spatialconnect-form-schema/native';
```




