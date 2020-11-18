import React, { useMemo } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import inComeCategories from '../configs/inComeCategories';
import outComeCategories from '../configs/outComeCategories';
import FastImage from 'react-native-fast-image';
import { formatCurrency } from '../commons/format';
import { groupBy } from '../commons/array';
import { VictoryPie } from 'victory-native';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

const { width } = Dimensions.get('window');

const moneySelector = (state: any) => state.money;

const inOutComeSelector = (type: string) =>
  createSelector(moneySelector, (money) =>
    type === 'InComeHistory' ? money.inComing : money.outComing,
  );

const History = ({ route, navigation }: any) => {
  const histories = useSelector(inOutComeSelector(route.name));
  const categories = useMemo(
    () =>
      route.name === 'InComeHistory' ? inComeCategories : outComeCategories,
    [route.name],
  );
  const theme: any = useTheme();
  const historiesByCategory = useMemo(() => groupBy(histories, 'categoryId'), [
    histories,
  ]);
  const chartData = useMemo(() => {
    return Object.keys(historiesByCategory).map((key: string) => {
      const categoryItem = categories.find(
        (category) => category.categoryId === key,
      );
      return {
        name: categoryItem?.name,
        x: ' ',
        color: categoryItem?.code || 'red',
        y: historiesByCategory[key].reduce(
          (S: number, i: any) => S + i.total,
          0,
        ),
      };
    });
  }, [categories, historiesByCategory]);

  return (
    <View style={styles.flex1}>
      <View
        style={[
          styles.rowCenter,
          {
            backgroundColor: theme.colors.itemBackground,
            marginBottom: 1,
          },
        ]}>
        <VictoryPie
          colorScale={chartData.map((item) => item.color)}
          data={chartData}
          width={(width * 3) / 5}
          height={(width * 3) / 5}
          padding={{ left: 30, right: 30, top: 30, bottom: 30 }}
        />
        <FlatList
          data={Object.keys(historiesByCategory)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const category = categories.find((c) => c.categoryId === item);
            return (
              <View style={styles.rowCenter}>
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: category?.code,
                    },
                  ]}
                />
                <Text theme={theme}>{category?.name}</Text>
              </View>
            );
          }}
        />
      </View>
      <FlatList
        data={Object.keys(historiesByCategory)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const category = categories.find((c) => c.categoryId === item);
          return (
            <Pressable
              onPress={() =>
                navigation.navigate('HistoryList', {
                  items: historiesByCategory[item],
                  type: route.name,
                })
              }>
              <View
                style={[
                  styles.container,
                  {
                    backgroundColor: theme.colors.itemBackground,
                  },
                ]}>
                <FastImage style={styles.icon} source={category?.icon} />
                <View style={styles.infoContainer}>
                  <View style={styles.rowCenterSB}>
                    <Text style={styles.title} numberOfLines={1} theme={theme}>
                      {category?.name}
                    </Text>
                    <View
                      style={[
                        styles.dot2,
                        {
                          backgroundColor: category?.code,
                        },
                      ]}
                    />
                  </View>
                  <View style={styles.rowCenterSB}>
                    <Text style={styles.total} theme={theme}>
                      {formatCurrency(
                        historiesByCategory[item]
                          .reduce((S: number, i: any) => S + i.total, 0)
                          .toString(),
                      )}
                    </Text>
                    <Text style={styles.title} numberOfLines={1} theme={theme}>
                      {historiesByCategory[item].length} ghi chép
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    padding: 10,
    marginBottom: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  total: {
    fontSize: 16,
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 15,
    marginLeft: 5,
  },
  dot: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginVertical: 5,
    marginRight: 5,
  },
  dot2: {
    height: 18,
    width: 18,
    borderRadius: 9,
    marginVertical: 5,
    marginRight: 5,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenterSB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default History;
