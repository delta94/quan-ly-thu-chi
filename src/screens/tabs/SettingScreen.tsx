import React, { useEffect, useState } from 'react';
import { Appbar, Switch } from 'react-native-paper';
// @ts-ignore
import { Appearance } from 'react-native-appearance';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

const SettingScreen = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const theme = useTheme();
  const onToggleSwitch = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    Appearance.set({ colorScheme: isDarkMode ? 'dark' : 'light' });
  }, [isDarkMode]);

  return (
    <View style={styles.container}>
      <Appbar.Header theme={theme}>
        <Appbar.Content title="Nhập khoản thu chi" />
      </Appbar.Header>
      <Switch value={isDarkMode} onValueChange={onToggleSwitch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingScreen;
