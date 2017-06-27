import { StyleSheet } from 'react-native';

const palette = {
  blue: '#265d79',
  lightBlue: '#588aa8',
  darkBlue: '#00344d',
  orange: '#EC7B3F',
  lightOrange: '#ffab6c',
  darkOrange: '#b44d11',
  green: '#209678',
  lightGreen: '#ACCD38',
  gray: '#F5F5F6',
  darkGray: '#E1E2E1',
  LABEL_COLOR: '#000000',
  INPUT_COLOR: '#000000',
  ERROR_COLOR: '#a94442',
  HELP_COLOR: '#999999',
  BORDER_COLOR: '#cccccc',
  DISABLED_COLOR: '#777777',
  DISABLED_BACKGROUND_COLOR: '#eeeeee',
  FONT_SIZE: 17,
  FONT_WEIGHT: '500',
  INPUT_HEIGHT: 46,
};

export default {
  palette: palette,
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
      marginBottom: 10,
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
