import React, { useEffect, useState } from 'react';
import { Appbar, Avatar, Switch, Text } from 'react-native-paper';
// @ts-ignore
import { Appearance, useColorScheme } from 'react-native-appearance';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import avatar from '../../assets/icons/avatar.jpg';
import auth from '@react-native-firebase/auth';
import { setTheme } from '../../services/theme';

const SettingScreen = () => {
  const scheme = useColorScheme();
  const [isDarkMode, setDarkMode] = useState(scheme === 'dark');
  const theme: any = useTheme();
  const onToggleSwitch = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    Appearance.set({ colorScheme: isDarkMode ? 'dark' : 'light' });
    setTheme(isDarkMode ? 'dark' : 'light').then(() =>
      console.log('Theme set successfully'),
    );
  }, [isDarkMode]);

  return (
    <View style={styles.container}>
      <Appbar.Header theme={theme}>
        <Appbar.Content title="Cài đặt" />
      </Appbar.Header>
      <View
        style={[
          styles.avatarContainer,
          { backgroundColor: theme.colors.itemBackground },
        ]}>
        <Avatar.Image
          source={
            (auth().currentUser?.photoURL && {
              uri: auth().currentUser?.photoURL,
            }) ||
            avatar
          }
        />
        <View style={styles.infoContainer}>
          <Text theme={theme} style={styles.fullName}>
            {auth().currentUser?.displayName}
          </Text>
          <Text theme={theme}>{auth().currentUser?.email}</Text>
        </View>
      </View>
      <View
        style={[
          styles.menuContainer,
          { backgroundColor: theme.colors.itemBackground },
        ]}>
        <Text theme={theme} style={styles.menuTitle}>
          Chế độ tối
        </Text>
        <Switch value={isDarkMode} onValueChange={onToggleSwitch} />
      </View>
      <View
        style={[
          styles.menuContainer,
          { backgroundColor: theme.colors.itemBackground },
        ]}>
        <Text theme={theme} style={styles.menuTitle}>
          Tài khoản
        </Text>
        <Pressable onPress={() => auth().signOut()}>
          <Text
            theme={theme}
            style={[styles.menuTitle, { color: theme.colors.accent }]}>
            Đăng xuất
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    marginTop: 1,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  fullName: {
    fontWeight: '500',
    fontSize: 18,
  },
  menuContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  menuTitle: {
    fontSize: 16,
  },
});

export default SettingScreen;
