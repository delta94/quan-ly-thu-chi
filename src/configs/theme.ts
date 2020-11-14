import { DefaultTheme } from '@react-navigation/native';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#7e3ff2',
    background: '#EFEFEF',
    borderColor: '#CCC',
  },
};

export type ThemeType = keyof typeof lightTheme;

export { lightTheme };
