import React from 'react';
import { Platform, View, Text, Switch } from 'react-native';
import scstyles from 'scstyles';

export default function(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var checkboxStyle = stylesheet.checkbox.normal;
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;
  var switchContainerStyle = stylesheet.switchContainer;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    checkboxStyle = stylesheet.checkbox.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  var label = locals.label
    ? <Text style={controlLabelStyle}>
        {locals.label}
      </Text>
    : null;
  var help = locals.help
    ? <Text style={helpBlockStyle}>
        {locals.help}
      </Text>
    : null;
  var error =
    locals.hasError && locals.error
      ? <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
          {locals.error}
        </Text>
      : null;

  return (
    <View style={formGroupStyle}>
      {label}
      <View style={switchContainerStyle}>
        <Switch
          accessibilityLabel={locals.label}
          ref="input"
          disabled={locals.disabled}
          onTintColor={scstyles.palette.orange}
          thumbTintColor={Platform.OS === 'android' ? scstyles.palette.gray : null}
          tintColor={locals.tintColor}
          style={checkboxStyle}
          onValueChange={value => locals.onChange(value)}
          value={locals.value}
        />
      </View>
      {help}
      {error}
    </View>
  );
}
