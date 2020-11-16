import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { lightTheme, darkTheme } from './src/configs/theme';
import AppNavigation from './src/routers/AppNavigation';
// @ts-ignore
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { Provider } from 'react-redux';
import store from './src/services/store';
import Notify from './src/components/Notify';

const App = () => {
  const scheme = useColorScheme();
  return (
    <AppearanceProvider>
      <Provider store={store}>
        <NavigationContainer theme={scheme === 'dark' ? darkTheme : lightTheme}>
          <Notify />
          <AppNavigation />
        </NavigationContainer>
      </Provider>
    </AppearanceProvider>
  );
};

export default App;
