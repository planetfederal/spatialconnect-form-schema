import React from 'react';
import { Text, View, Slider } from 'react-native';
import scstyles from '../scstyles';

export default function(locals) {
  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;

  function onChange(value) {
    locals.onChange(Math.round(value * 100) / 100);
  }

  return (
    <View style={formGroupStyle}>
      <Text style={controlLabelStyle}>{locals.label}</Text>
      <Slider
        value={+locals.value}
        minimumValue={+locals.config.minimum}
        maximumValue={+locals.config.maximum}
        onValueChange={onChange}
        thumbTintColor={scstyles.palette.orange}
        step={1}
        minimumTrackTintColor={scstyles.palette.orange}
        maximumTrackTintColor={scstyles.palette.lightOrange}
      />
      <Text>Value: {locals.value}</Text>
    </View>
  );
}
