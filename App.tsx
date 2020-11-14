import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { lightTheme, darkTheme } from './src/configs/theme';
import AppNavigation from './src/routers/AppNavigation';
// @ts-ignore
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

const App = () => {
  const scheme = useColorScheme();
  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? darkTheme : lightTheme}>
        <AppNavigation />
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default App;
