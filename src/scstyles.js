import { StyleSheet } from 'react-native';

const palette = {
  lightblue: '#5789a6',
  gray: '#EEEEEE',
  green: '#209678',
  blue: '#265d79',
  darkblue: '#0a354a',
  orange: '#EC7B3F',
  lightGreen: '#ACCD38',
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
      color: 'white',
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
      paddingLeft: 10,
      paddingRight: 10,
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
