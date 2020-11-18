import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import auth from '@react-native-firebase/auth';
import { getTheme } from '../services/theme';
import { Appearance } from 'react-native-appearance';
import MainStack from './MainStack';
import { useDispatch } from 'react-redux';
import { resetStore } from '../services/actions/reset';
import RNBootSplash from 'react-native-bootsplash';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const [isSignedIn, setSignedIn] = useState(false);
  const [checkSignedIn, setCheckSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getTheme().then((theme) => {
      console.log(theme);
      Appearance.set({ colorScheme: theme });
      setIsLoading(false);
    });
    return auth().onAuthStateChanged((user) => {
      console.log(user);
      setSignedIn(!!user);
      if (!isLoading && checkSignedIn && !user) {
        dispatch(resetStore());
      }
      setCheckSignedIn(true);
    });
  }, [checkSignedIn, dispatch, isLoading]);

  useEffect(() => {
    RNBootSplash.hide({ fade: true }).then(() => {
      console.log('SplashScreen hide complete');
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
