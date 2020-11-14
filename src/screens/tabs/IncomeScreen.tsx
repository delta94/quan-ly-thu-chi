import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';

const IncomeScreen = () => {
  const [description, setDescription] = React.useState('');
  const [total, setTotal] = React.useState('');
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput
        placeholder="Ghi chú"
        label="Ghi chú"
        mode="outlined"
        theme={theme}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Số tiền"
        label="Số tiền"
        mode="outlined"
        theme={theme}
        value={total}
        onChangeText={setTotal}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
});

export default IncomeScreen;
