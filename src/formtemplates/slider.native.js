import React from 'react';
import { Text, View, Slider } from 'react-native';
import scstyles from 'scstyles';

export default function(locals) {
  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var errorBlockStyle = stylesheet.errorBlock;
  var sliderValueStyle = stylesheet.sliderValue;
  var labelContainerStyle = stylesheet.labelContainer;
  var typeLabelStyle = stylesheet.typeLabel;
  var sliderValue = stylesheet.sliderValue;

  if (locals.hasError) {
    controlLabelStyle = stylesheet.controlLabel.error;
  }

  var type = (
    <Text style={[typeLabelStyle, sliderValue]}>
      {locals.value}
    </Text>
  );
  var label = locals.label
    ? <Text style={controlLabelStyle}>
        {locals.label}
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
      <View style={labelContainerStyle}>
        {label}
        {type}
      </View>
      <Slider
        value={+locals.value}
        minimumValue={+locals.config.minimum}
        maximumValue={+locals.config.maximum}
        onValueChange={value => locals.onChange(Math.round(value * 100) / 100)}
        thumbTintColor={scstyles.palette.orange}
        step={1}
        minimumTrackTintColor={scstyles.palette.orange}
        maximumTrackTintColor={scstyles.palette.lightOrange}
      />
      {error}
    </View>
  );
}
