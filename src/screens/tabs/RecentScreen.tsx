import React, { useMemo } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { dateString, formatCurrency } from '../../commons/format';
import inComeCategories from '../../configs/inComeCategories';
import outComeCategories from '../../configs/outComeCategories';
import moment from 'moment';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { deepCopyArray, groupBy } from '../../commons/array';
import LinearGradient from 'react-native-linear-gradient';
import Empty from "../../components/Empty";

const moneySelector = (state: any) => state.money;

const inOutComeSelector = createSelector(moneySelector, (money) => money);

const RecentScreen = () => {
  const theme: any = useTheme();
  const categories = useMemo(
    () => [...inComeCategories, ...outComeCategories],
    [],
  );
  const history = useSelector(inOutComeSelector);
  const getHistories = useMemo(() => {
    const tmpHistory = [
      ...deepCopyArray(history.inComing),
      ...deepCopyArray(history.outComing),
    ].map((item) => ({
      ...item,
      sortTime: item.date.seconds,
      title: moment(item.date.seconds * 1000).format('DD/MM/YYYY'),
    }));
    const tmpHistoryGroup = groupBy(tmpHistory, 'title');
    return Object.keys(tmpHistoryGroup)
      .map((k) => {
        return {
          title: k,
          data: [...tmpHistoryGroup[k]].sort(
            (a, b) => b.createdAt.seconds - a.createdAt.seconds,
          ),
        };
      })
      .sort((a, b) =>
        moment(b.title, 'DD/MM/YYYY').diff(moment(a.title, 'DD/MM/YYYY')),
      );
  }, [history.inComing, history.outComing]);
  return (
    <View style={styles.container}>
      <Appbar.Header theme={theme}>
        <Appbar.Content title="Ghi chép" />
      </Appbar.Header>
      <SectionList
        style={styles.section}
        sections={getHistories}
        renderSectionFooter={() => <View style={{ height: 5 }} />}
        renderSectionHeader={({ section }: any) => {
          const total = section.data.reduce(
            (S: number, item: any) =>
              item.incoming ? S + item.total : S - item.total,
            0,
          );
          return (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={theme.colors.gradient}
              style={styles.sectionItem}>
              <Text theme={theme} style={[styles.sectionTitle]}>
                {dateString(section.title)}
              </Text>
              <Text
                theme={theme}
                style={[
                  styles.totalOfDay,
                  {
                    color: total > 0 ? 'green' : 'red',
                  },
                ]}>
                {total >= 0 ? '+' : ''}
                {formatCurrency(total.toString())} đ
              </Text>
            </LinearGradient>
          );
        }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <Empty title="Chưa có ghi chép" />}
        renderItem={({ item }) => {
          const icon = categories.find(
            (category) => category.categoryId === item.categoryId,
          )?.icon;
          return (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[...theme.colors.gradient].reverse()}
              style={[styles.itemContainer]}>
              <FastImage style={styles.icon} source={icon} />
              <View style={styles.container}>
                <View style={styles.row}>
                  <Text style={styles.title} numberOfLines={1} theme={theme}>
                    {item.description || 'Không có mô tả'}
                  </Text>
                  <Text style={styles.date} numberOfLines={1} theme={theme}>
                    {moment(
                      (item.date && item.date.seconds * 1000) || new Date(),
                    ).format('DD/MM/YYYY')}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.createdAt} theme={theme}>
                    {moment(item.createdAt.seconds * 1000).format(
                      'HH:mm DD/MM/YYYY',
                    )}
                  </Text>
                  <Text
                    style={[
                      styles.total,
                      { color: item.incoming ? 'green' : 'red' },
                    ]}
                    theme={theme}>
                    {item.incoming ? '+' : '-'}{' '}
                    {formatCurrency(item.total.toString())} đ
                  </Text>
                </View>
              </View>
            </LinearGradient>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  date: {
    fontSize: 16,
  },
  total: {
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    height: 32,
    width: 32,
    marginRight: 15,
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createdAt: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    padding: 15,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  section: {
    marginTop: 1,
  },
  totalOfDay: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  sectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },
});

export default RecentScreen;
