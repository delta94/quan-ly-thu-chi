import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#7e3ff2',
    border: '#7e3ff2',
    placeholder: '#7e3ff2',
    background: '#eee',
    itemBackground: '#ffffff',
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#33691E',
    border: '#33691E',
    placeholder: '#33691E',
    itemBackground: '#000000',
  },
};

export type ThemeType = keyof typeof lightTheme;

export { lightTheme, darkTheme };
