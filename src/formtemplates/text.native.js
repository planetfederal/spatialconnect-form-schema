import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import scstyles from '../scstyles';

function textbox(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var textboxStyle = stylesheet.textbox.normal;
  var textboxViewStyle = stylesheet.textboxView.normal;
  var numberTextboxStyle = stylesheet.numberTextboxStyle;
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var labelContainerStyle = stylesheet.labelContainer;
  var typeLabelStyle = stylesheet.typeLabel;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    textboxStyle = stylesheet.textbox.error;
    textboxViewStyle = stylesheet.textboxView.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  if (locals.config.fieldType === 'number') {
    textboxStyle = {
      ...textboxStyle,
      ...numberTextboxStyle,
    };
  }

  if (locals.editable === false) {
    textboxStyle = stylesheet.textbox.notEditable;
  }

  var type = (
    <Text style={typeLabelStyle}>{locals.config.fieldType === 'string' ? 'text' : 'number'}</Text>
  );
  var label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
  var help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
  var error = locals.hasError && locals.error
    ? <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text>
    : null;

  function onChange(value) {
    if (locals.config.fieldType === 'number') {
      value = value.replace(/\D/g, '');
    }
    locals.onChange(value);
  }

  return (
    <View style={formGroupStyle}>
      <View style={labelContainerStyle}>
        {label}
        {type}
      </View>
      <View style={textboxViewStyle}>
        <TextInput
          accessibilityLabel={locals.label}
          ref="input"
          autoCapitalize={locals.autoCapitalize}
          autoCorrect={locals.autoCorrect}
          autoFocus={locals.autoFocus}
          blurOnSubmit={locals.blurOnSubmit}
          editable={locals.editable}
          keyboardType={locals.keyboardType}
          maxLength={locals.maxLength}
          multiline={locals.multiline}
          onBlur={locals.onBlur}
          onEndEditing={locals.onEndEditing}
          onFocus={locals.onFocus}
          onLayout={locals.onLayout}
          onSelectionChange={locals.onSelectionChange}
          onSubmitEditing={locals.onSubmitEditing}
          placeholderTextColor={locals.placeholderTextColor}
          secureTextEntry={locals.secureTextEntry}
          selectTextOnFocus={locals.selectTextOnFocus}
          selectionColor={locals.selectionColor}
          numberOfLines={locals.numberOfLines}
          underlineColorAndroid={locals.underlineColorAndroid}
          clearButtonMode={locals.clearButtonMode}
          clearTextOnFocus={locals.clearTextOnFocus}
          enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
          keyboardAppearance={locals.keyboardAppearance}
          onKeyPress={locals.onKeyPress}
          returnKeyType={locals.returnKeyType}
          selectionState={locals.selectionState}
          onChangeText={onChange}
          onChange={locals.onChangeNative}
          placeholder={locals.placeholder}
          style={textboxStyle}
          value={locals.value}
        />
      </View>
      {help}
      {error}
    </View>
  );
}

module.exports = textbox;
