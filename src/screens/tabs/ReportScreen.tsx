import React from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import HistoryTabs from '../../routers/HistoryTabs';

const ReportScreen = () => {
  const theme: any = useTheme();

  return (
    <View style={styles.container}>
      <Appbar.Header theme={theme}>
        <Appbar.Content title="Tình hình thu chi" />
      </Appbar.Header>
      <ScrollView>
        <HistoryTabs />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  outComingLabel: {
    padding: 10,
    fontSize: 16,
  },
});
export default ReportScreen;
