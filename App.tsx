import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { lightTheme } from './src/configs/theme';
import AppNavigation from './src/routers/AppNavigation';

const App = () => (
  <NavigationContainer theme={lightTheme}>
    <AppNavigation />
  </NavigationContainer>
);

export default App;
