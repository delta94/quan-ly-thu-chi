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
    gradient: ['#ffffff', '#eeeeee'],
    accent: '#7e3ff2',
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#222222',
    border: '#222222',
    placeholder: '#222222',
    itemBackground: '#222222',
    gradient: ['#222222', '#131313'],
    background: '#000000',
    accent: '#513680',
  },
};

export type ThemeType = keyof typeof lightTheme;

export { lightTheme, darkTheme };
