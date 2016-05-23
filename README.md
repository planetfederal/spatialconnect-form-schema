Validates a SpatialConnect form schema and translates to a [tcomb-json-schema](https://github.com/gcanti/tcomb-json-schema).

# API

## translate(form: SCForm): JSONSchema

**Example**

```js
import scformschema from 'spatialconnect-form-schema';
import transform from 'tcomb-json-schema';

let form = {
  "id": 1,
  "name": "A Form name",
  "fields": [
    {
      "id": "aa953d70-1d08-11e6-a278-399d397eaaa4",
      "order": 0,
      "key": "name",
      "name": "Name",
      "type": "string"
    },
    {
      "id": "0f8f8e30-1d34-11e6-9457-1d41829e18ba",
      "order": 1,
      "key": "age",
      "name": "Age",
      "type": "number"
    }
  ]
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




