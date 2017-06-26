import React from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

import palette from '../palette';

export default function(locals) {
  var stylesheet = locals.stylesheet;

  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var textboxStyle = stylesheet.textbox.normal;
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    textboxStyle = stylesheet.textbox.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  if (locals.editable === false) {
    textboxStyle = stylesheet.textbox.notEditable;
  }

  var label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
  var help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
  var error = locals.hasError && locals.error
    ? <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text>
    : null;

  var styles = StyleSheet.create({
    counters: {
      flexDirection: 'row',
    },
    buttonText: {
      fontSize: 24,
      color: 'white',
      alignSelf: 'center',
    },
    button: {
      marginRight: 5,
      marginBottom: 5,
      height: 36,
      backgroundColor: palette.orange,
      borderColor: palette.orange,
      borderWidth: 1,
      borderRadius: 2,
      justifyContent: 'center',
      flex: 1,
    },
    textboxStyle: {
      flex: 1,
      color: palette.INPUT_COLOR,
      fontSize: palette.FONT_SIZE,
      height: 36,
      padding: 7,
      borderColor: palette.BORDER_COLOR,
      borderWidth: 1,
      borderRadius: 2,
      marginBottom: 5,
      marginRight: 5,
      backgroundColor: 'white',
    },
  });

  function increment() {
    locals.onChange((+locals.value + 1).toString());
  }

  function decrement() {
    locals.onChange((+locals.value - 1).toString());
  }

  return (
    <View style={formGroupStyle}>
      {label}
      <View style={styles.counters}>
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
          onChangeText={value => locals.onChange(value)}
          placeholder={locals.placeholder}
          maxLength={locals.maxLength}
          numberOfLines={locals.numberOfLines}
          textAlign={locals.textAlign}
          textAlignVertical={locals.textAlignVertical}
          underlineColorAndroid={locals.underlineColorAndroid}
          style={styles.textboxStyle}
          value={locals.value}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={increment}
          underlayColor={palette.orange}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={decrement}
          underlayColor={palette.orange}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableHighlight>
      </View>
      {help}
      {error}
    </View>
  );
}
