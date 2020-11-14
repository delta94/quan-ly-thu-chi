import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import auth from '@react-native-firebase/auth';
import HomeTab from './HomeTabs';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const [isSignedIn, setSignedIn] = useState(false);
  const [checkSignedIn, setCheckSignedIn] = useState(false);

  useEffect(() => {
    return auth().onAuthStateChanged((user) => {
      setSignedIn(!!user);
      setCheckSignedIn(true);
    });
  }, []);

  if (!checkSignedIn) {
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
          component={HomeTab}
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
