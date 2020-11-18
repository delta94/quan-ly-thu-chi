import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import empty from '../assets/icons/empty.png';
import FastImage from 'react-native-fast-image';

interface EmptyProps {
  title: string;
}

const Empty = ({ title }: EmptyProps) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <FastImage style={styles.icon} source={empty} />
      <Text theme={theme} style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: 25,
  },
  icon: {
    height: 100,
    width: 100,
  },
});

export default Empty;
