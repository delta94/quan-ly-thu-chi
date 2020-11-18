import React, { useCallback, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import HistoryTabs from '../../routers/HistoryTabs';
import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../commons/format';
import { setReportType } from '../../services/actions/money';
import Loading from '../../components/Loading';

const moneySelector = (state: any) => state.money;

const inOutComeSelector = createSelector(moneySelector, (money) => money);

const ReportScreen = () => {
  const history = useSelector(inOutComeSelector);
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const totalInCome = useMemo(() => {
    return history.inComing.reduce((S: number, item: any) => S + item.total, 0);
  }, [history.inComing]);
  const totalOutCome = useMemo(() => {
    return history.outComing.reduce(
      (S: number, item: any) => S + item.total,
      0,
    );
  }, [history.outComing]);

  const setReportType0 = useCallback(() => {
    dispatch(setReportType(0));
  }, [dispatch]);

  const setReportType1 = useCallback(() => {
    dispatch(setReportType(1));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Appbar.Header theme={theme}>
        <Appbar.Content title="Tình hình thu chi" />
      </Appbar.Header>
      <View
        style={[
          styles.selectDateRange,
          {
            backgroundColor: theme.colors.border,
          },
        ]}>
        <Pressable
          onPress={setReportType0}
          style={[
            styles.selectDateRangeButton,
            styles.border1,
            {
              backgroundColor:
                history.reportType !== 0 ? theme.colors.primary : '#FFF',
            },
          ]}>
          <Text
            style={
              history.reportType !== 0
                ? { color: '#FFF' }
                : { color: theme.colors.primary }
            }
            theme={theme}>
            7 ngày
          </Text>
        </Pressable>
        <Pressable
          onPress={setReportType1}
          style={[
            styles.selectDateRangeButton,
            styles.border2,
            {
              backgroundColor:
                history.reportType !== 1 ? theme.colors.primary : '#FFF',
            },
          ]}>
          <Text
            style={
              history.reportType !== 1
                ? { color: '#FFF' }
                : { color: theme.colors.primary }
            }
            theme={theme}>
            30 ngày
          </Text>
        </Pressable>
      </View>
      <ScrollView style={styles.scollView}>
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
      <Loading isLoading={history.isLoading} />
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
  scollView: {
    marginTop: 1,
  },
  selectDateRange: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  selectDateRangeButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: 'center',
    marginTop: 1,
  },
  border1: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: '#FFF',
  },
  border2: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#FFF',
  },
});
export default ReportScreen;
