import update from 'immutability-helper';

function validateFields(value, schema, options) {
  let fields = {};
  let formResult = {
    hasError: false,
  };
  let fieldResult = {};

  for (let field in schema.properties) {
    fieldResult = validateFormField(value[field], schema.properties[field]);

    if (fieldResult.hasError) {
      formResult.hasError = true;
    }

    fields[field] = update(options.fields[field], {
      hasError: { $set: fieldResult.hasError },
      error: { $set: fieldResult.error },
    });
  }

  formResult['options'] = update(options, {
    fields: { $set: fields },
  });

  return formResult;
}

function validateFormField(value, config) {
  let errorMsgs = [];

  // required - value must be provided
  if (config.hasOwnProperty('required') && config.required && !value) {
    // allow booleans to be false (yes/no fields)
    // allow number fields (esp. sliders) to be 0
    if (!(config.type == 'boolean' || (config.type == 'number' && value == 0))) {
      errorMsgs.push('value is required');
    }
  }

  // minimum - value must be numerically >= to minimum
  if (config.hasOwnProperty('minimum')) {
    let minimum = Number(config.minimum);
    if (value < minimum) {
      errorMsgs.push('value must be >= ' + minimum);
    }
  }

  // maximum - value must be numerically <= to maximum
  if (config.hasOwnProperty('maximum')) {
    let maximum = Number(config.maximum);
    if (value > maximum) {
      errorMsgs.push('value must be <= ' + maximum);
    }
  }

  // minLength - value must have at least minLength characters
  if (config.hasOwnProperty('minLength')) {
    let minLength = config.minLength;
    if (String(value).length < minLength) {
      errorMsgs.push('value must have at least ' + minLength + ' characters');
    }
  }

  // maxLength - value must have less than maxLength characters
  if (config.hasOwnProperty('maxLength')) {
    let maxLength = config.maxLength;
    if (String(value).length > maxLength) {
      errorMsgs.push('value must have less than ' + maxLength + ' characters');
    }
  }

  // pattern - value must match specified regular expression
  if (config.hasOwnProperty('pattern')) {
    let pattern = RegExp(config.pattern);
    if (!pattern.test(value)) {
      errorMsgs.push('value does not match pattern: ' + pattern);
    }
  }

  return { error: errorMsgs.join('\n'), hasError: errorMsgs.length > 0 };
}

export default validateFields;
