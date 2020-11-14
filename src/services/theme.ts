import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTheme = async (): Promise<'dark' | 'light'> => {
  try {
    const theme: 'dark' | 'light' | null = (await AsyncStorage.getItem(
      'theme',
    )) as 'dark' | 'light' | null;
    return theme || 'light';
  } catch {
    return 'light';
  }
};

export const setTheme = (theme: 'light' | 'dark') => {
  return AsyncStorage.setItem('theme', theme);
};
