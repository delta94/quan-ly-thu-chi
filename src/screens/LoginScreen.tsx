import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { onGoogleButtonPress } from '../services/auth';

const LoginScreen = () => {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Icon.Button
        onPress={onGoogleButtonPress}
        name="google"
        color="#000"
        backgroundColor="#CECECE"
        style={styles.button}>
        Đăng nhập bằng Google
      </Icon.Button>
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
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
});

export default LoginScreen;
