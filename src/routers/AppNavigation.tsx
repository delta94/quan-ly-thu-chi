import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import auth from '@react-native-firebase/auth';
import { getTheme } from '../services/theme';
import { Appearance } from 'react-native-appearance';
import MainStack from './MainStack';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const [isSignedIn, setSignedIn] = useState(false);
  const [checkSignedIn, setCheckSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTheme().then((theme) => {
      console.log(theme);
      Appearance.set({ colorScheme: theme });
      setIsLoading(false);
    });
    return auth().onAuthStateChanged((user) => {
      setSignedIn(!!user);
      setCheckSignedIn(true);
    });
  }, []);

  if (!checkSignedIn || isLoading) {
    return null;
  }

  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="HomeScreen"
          component={MainStack}
        />
      ) : (
        <Stack.Screen
          options={{
            headerTitle: 'Đăng nhập',
          }}
          name="LoginScreen"
          component={LoginScreen}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigation;
