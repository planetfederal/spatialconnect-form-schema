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

  let value = field.props.value;
  let config = options.hasOwnProperty('config') ? options.config : {};
  let errorMsgs = [];

  if (config.hasOwnProperty('required')) {
    let required = config.required;
    if (required && !value) {
      errorMsgs.push('value is required');
    }
  }

  if (config.hasOwnProperty('minimum')) {
    let minimum = Number(config.minimum);
    if (value < minimum) {
      errorMsgs.push('value must be >= ' + minimum);
    }
  }

  if (config.hasOwnProperty('maximum')) {
    let maximum = Number(config.maximum);
    if (value > maximum) {
      errorMsgs.push('value must be <= ' + maximum);
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
