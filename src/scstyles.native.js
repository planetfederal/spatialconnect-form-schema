import { Platform, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';
import { cloneDeep } from 'lodash';
import palette from './palette';

let formStyle = cloneDeep(t.form.Form.stylesheet);

const formGroup = {
  marginBottom: 20,
};
formStyle.formGroup.normal = {
  ...formStyle.formGroup.normal,
  ...formGroup,
};
formStyle.formGroup.error = {
  ...formStyle.formGroup.error,
  ...formGroup,
};

const textbox = {
  borderRadius: palette.BORDER_RADIUS,
  height: palette.INPUT_HEIGHT,
  marginBottom: 0,
};
formStyle.textbox.normal = {
  ...formStyle.textbox.normal,
  ...textbox,
};
formStyle.textbox.error = {
  ...formStyle.textbox.error,
  ...textbox,
};
formStyle.numberTextboxStyle = {
  fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
};

const controlLabel = {
  flexWrap: 'wrap',
  flex: 1,
  paddingVertical: 8,
  marginBottom: 0,
};
formStyle.controlLabel.normal = {
  ...formStyle.controlLabel.normal,
  ...controlLabel,
};
formStyle.controlLabel.error = {
  ...formStyle.controlLabel.error,
  ...controlLabel,
};

formStyle.labelContainer = {
  justifyContent: 'space-between',
  flexDirection: 'row',
  flexGrow: 1,
  flexWrap: 'wrap',
};
formStyle.typeLabel = {
  color: 'rgba(0, 0, 0, 0.38)',
  textAlign: 'right',
  paddingVertical: 8,
  flex: 0.3,
};
formStyle.counterContainer = {
  flexDirection: 'row',
};
const counterTextbox = {
  flex: 1,
  marginRight: 10,
  fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
};
formStyle.counterTextbox = {
  normal: {
    ...formStyle.textbox.normal,
    ...textbox,
    ...counterTextbox,
  },
  error: {
    ...formStyle.textbox.error,
    ...textbox,
    ...counterTextbox,
  },
};

const errorBlock = {
  marginBottom: 0,
  paddingVertical: 4,
};
formStyle.errorBlock = {
  ...formStyle.errorBlock,
  ...errorBlock,
};

formStyle.sliderValue = {
  color: 'rgba(0, 0, 0, 0.38)',
  fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
};

formStyle.switchContainer = {
  justifyContent: 'center',
  height: palette.INPUT_HEIGHT,
  flexDirection: 'column',
};

const checkbox = {
  width: 50,
};
formStyle.checkbox.normal = {
  ...formStyle.checkbox.normal,
  ...checkbox,
};
formStyle.checkbox.error = {
  ...formStyle.checkbox.error,
  ...checkbox,
};

const pickerContainer = {
  marginBottom: 0,
  borderRadius: palette.BORDER_RADIUS,
};
formStyle.pickerContainer.normal = {
  ...formStyle.pickerContainer.normal,
  ...pickerContainer,
};
formStyle.pickerContainer.error = {
  ...formStyle.pickerContainer.error,
  ...pickerContainer,
};

export default {
  palette: palette,
  formStyle: formStyle,
  buttonStyles: StyleSheet.create({
    buttonText: {
      fontSize: 18,
      color: 'black',
      alignSelf: 'center',
    },
    button: {
      height: palette.INPUT_HEIGHT,
      backgroundColor: palette.orange,
      borderColor: palette.orange,
      borderWidth: 0,
      borderRadius: 2,
      borderRadius: 2,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
      paddingLeft: 20,
      paddingRight: 20,
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    disabled: {
      opacity: 0.5,
    },
    link: {
      color: 'blue',
    },
  }),
};
