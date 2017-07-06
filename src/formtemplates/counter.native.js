import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import scstyles from '../scstyles';

export default function(locals) {
  var stylesheet = locals.stylesheet;

  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var textboxStyle = stylesheet.counterTextbox.normal;
  var textboxViewStyle = stylesheet.textboxView.normal;
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;
  var counterContainerStyle = stylesheet.counterContainer;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    textboxStyle = stylesheet.counterTextbox.error;
    textboxViewStyle = stylesheet.textboxView.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  if (locals.editable === false) {
    _textboxStyle = stylesheet.textbox.notEditable;
  }

  var label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
  var help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
  var error = locals.hasError && locals.error
    ? <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text>
    : null;

  function increment() {
    locals.onChange((+locals.value + 1).toString());
  }

  function decrement() {
    locals.onChange((+locals.value - 1).toString());
  }

  function onChange(value) {
    locals.onChange(value.replace(/\D/g, ''));
  }

  return (
    <View style={formGroupStyle}>
      {label}
      <View style={counterContainerStyle}>
        <TextInput
          accessibilityLabel={locals.label}
          ref="input"
          autoCapitalize={locals.autoCapitalize}
          autoCorrect={locals.autoCorrect}
          autoFocus={locals.autoFocus}
          bufferDelay={locals.bufferDelay}
          clearButtonMode={locals.clearButtonMode}
          editable={locals.editable}
          enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
          keyboardType={locals.keyboardType}
          multiline={locals.multiline}
          onBlur={locals.onBlur}
          onEndEditing={locals.onEndEditing}
          onFocus={locals.onFocus}
          onSubmitEditing={locals.onSubmitEditing}
          password={locals.password}
          placeholderTextColor={locals.placeholderTextColor}
          returnKeyType={locals.returnKeyType}
          selectTextOnFocus={locals.selectTextOnFocus}
          secureTextEntry={locals.secureTextEntry}
          selectionState={locals.selectionState}
          onChangeText={onChange}
          placeholder={locals.placeholder}
          maxLength={locals.maxLength}
          numberOfLines={locals.numberOfLines}
          textAlign={locals.textAlign}
          textAlignVertical={locals.textAlignVertical}
          underlineColorAndroid={locals.underlineColorAndroid}
          style={textboxStyle}
          value={locals.value}
        />
        <TouchableOpacity
          style={[scstyles.buttonStyles.button, { marginRight: 10 }]}
          onPress={increment}
        >
          <Text style={scstyles.buttonStyles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={scstyles.buttonStyles.button} onPress={decrement}>
          <Text style={scstyles.buttonStyles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      {help}
      {error}
    </View>
  );
}
