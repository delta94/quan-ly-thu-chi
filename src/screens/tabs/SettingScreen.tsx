import React, { useEffect, useState } from 'react';
import { Switch } from 'react-native-paper';
// @ts-ignore
import { Appearance } from 'react-native-appearance';

const SettingScreen = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  const onToggleSwitch = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    Appearance.set({ colorScheme: isDarkMode ? 'dark' : 'light' });
  }, [isDarkMode]);

  return <Switch value={isDarkMode} onValueChange={onToggleSwitch} />;
};

export default SettingScreen;
