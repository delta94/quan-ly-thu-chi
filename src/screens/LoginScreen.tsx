import React, { useCallback, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { onGoogleButtonPress } from '../services/auth';
import { Button } from 'react-native-paper';
import { useColorScheme } from 'react-native-appearance';
import { useDispatch } from 'react-redux';
import { success } from '../services/actions/notify';

const LoginScreen = () => {
  const theme = useTheme();
  const scheme = useColorScheme();
  const dispatch = useDispatch();
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const signInWithGoogle = useCallback(async () => {
    setIsLoadingGoogle(true);
    try {
      await onGoogleButtonPress();
    } catch {
    } finally {
      setIsLoadingGoogle(false);
    }
  }, []);
  const signInWithApple = useCallback(() => {
    dispatch(
      success({
        title: 'Thông báo',
        description: 'Chức năng này đang hoàn thiện',
      }),
    );
  }, []);
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Button
        style={styles.button}
        onPress={signInWithApple}
        icon="apple"
        theme={theme}>
        Đăng nhập bằng Apple
      </Button>
      <Button
        loading={isLoadingGoogle}
        style={styles.button}
        onPress={signInWithGoogle}
        icon="google"
        theme={theme}>
        Đăng nhập bằng Google
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    backgroundColor: '#CCC',
    marginVertical: 5,
  },
});

export default LoginScreen;
