import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import HistoryTabs from '../../routers/HistoryTabs';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../commons/format';

const moneySelector = (state: any) => state.money;

const inOutComeSelector = createSelector(moneySelector, (money) => money);

const ReportScreen = () => {
  const history = useSelector(inOutComeSelector);
  const theme: any = useTheme();
  const totalInCome = useMemo(() => {
    return history.inComing.reduce((S: number, item: any) => S + item.total, 0);
  }, [history.inComing]);
  const totalOutCome = useMemo(() => {
    return history.outComing.reduce(
      (S: number, item: any) => S + item.total,
      0,
    );
  }, [history.outComing]);

  return (
    <View style={styles.container}>
      <Appbar.Header theme={theme}>
        <Appbar.Content title="Tình hình thu chi" />
      </Appbar.Header>
      <ScrollView>
        <View
          style={[
            styles.totalContainer,
            {
              backgroundColor: theme.colors.border,
            },
          ]}>
          <View
            style={[
              styles.row,
              { backgroundColor: theme.colors.itemBackground },
            ]}>
            <Text style={styles.total} theme={theme}>
              Chi
            </Text>
            <Text style={styles.total} theme={theme}>
              {formatCurrency(totalOutCome.toString())} đ
            </Text>
          </View>
          <View
            style={[
              styles.row,
              { backgroundColor: theme.colors.itemBackground },
            ]}>
            <Text style={styles.total} theme={theme}>
              Thu
            </Text>
            <Text style={styles.total} theme={theme}>
              {formatCurrency(totalInCome.toString())} đ
            </Text>
          </View>
          <View
            style={[
              styles.row,
              { backgroundColor: theme.colors.itemBackground },
            ]}>
            <Text style={styles.total} theme={theme}>
              Số dư
            </Text>
            <Text style={styles.total} theme={theme}>
              {formatCurrency((totalInCome - totalOutCome).toString())} đ
            </Text>
          </View>
        </View>
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
  totalContainer: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  total: {
    fontSize: 18,
  },
});
export default ReportScreen;
