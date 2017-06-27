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
  var _textboxStyle = stylesheet.textbox.normal;
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    _textboxStyle = stylesheet.textbox.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  if (locals.editable === false) {
    _textboxStyle = stylesheet.textbox.notEditable;
  }

  var textboxStyle = {
    ..._textboxStyle,
    borderRadius: 2,
    height: scstyles.palette.INPUT_HEIGHT,
  };

  var type = (
    <Text style={styles.type}>{locals.config.fieldType === 'string' ? 'text' : 'number'}</Text>
  );
  var label = locals.label ? <Text style={styles.label}>{locals.label}</Text> : null;
  var help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
  var error = locals.hasError && locals.error
    ? <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text>
    : null;

  return (
    <View style={formGroupStyle}>
      <View style={styles.labelContainer}>
        {label}
        {type}
      </View>
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
        onChangeText={value => locals.onChange(value)}
        onChange={locals.onChangeNative}
        placeholder={locals.placeholder}
        style={textboxStyle}
        value={locals.value}
      />
      {help}
      {error}
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  type: {
    color: '#999999',
    textAlign: 'right',
    flex: 0.3,
  },
  label: {
    color: scstyles.palette.LABEL_COLOR,
    fontSize: scstyles.palette.FONT_SIZE,
    marginBottom: 7,
    fontWeight: scstyles.palette.FONT_WEIGHT,
    flexWrap: 'wrap',
    flex: 1,
  },
});

module.exports = textbox;
