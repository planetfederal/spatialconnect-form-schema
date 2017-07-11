function validateFields(form) {
  let valid = true;

  let refs = form.refs.input.refs;
  for (let ref in refs) {
    if (refs.hasOwnProperty(ref)) {
      if (validateFormField(refs[ref])) {
        valid = false;
      }
    }
  }

  return valid;
}

function validateFormField(field) {
  let options = {};
  if (field.props && field.props.hasOwnProperty('options')) {
    options = field.props.options;
  } else {
    return true;
  }

  let value = field.getValue();
  let config = options.hasOwnProperty('config') ? options.config : {};
  let errorMsgs = [];

  // required - value must be provided
  if (config.hasOwnProperty('required') && config.required && !value) {
    // allow booleans to be false (yes/no fields)
    // allow number fields (esp. sliders) to be 0
    if ((config.type == 'number' && value != 0) || config.type != 'boolean') {
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
      errorMsgs.push('value must have ' + minLength + ' characters');
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

  let errors = errorMsgs.join('\n');
  // if we have error messages, and it's different than what's already there
  if (errors !== options.error) {
    options.error = errors;
    // then we must force an update if options.hasError is already true
    if (field.hasError()) {
      field.forceUpdate();
    }
  }
  let hasErrors = errors.length > 0;
  // otherwise the field will be updated normally
  field.setState({ hasError: hasErrors });

  return hasErrors;
}

export default validateFields;
