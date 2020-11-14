import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useTheme } from '@react-navigation/native';
import inComeCategories from '../configs/inComeCategories';
import outComeCategories from '../configs/outComeCategories';
import FastImage from 'react-native-fast-image';
import { formatCurrency } from '../commons/format';
import { groupBy } from '../commons/array';
import { VictoryPie } from 'victory-native';

const { width } = Dimensions.get('window');

const History = ({ route }: any) => {
  const [histories, setHistories] = useState<any[]>([]);
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
  useEffect(() => {
    return firestore()
      .collection(route.name === 'InComeHistory' ? 'inComing' : 'outComing')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            setHistories((prevHistories) => {
              if (
                prevHistories.findIndex((item) => item.id === change.doc.id) ===
                -1
              ) {
                return [
                  { id: change.doc.id, ...change.doc.data() },
                  ...prevHistories,
                ];
              }
              return prevHistories;
            });
          }
          if (change.type === 'removed') {
            setHistories((prevHistories) => {
              return prevHistories.filter((item) => item.id !== change.doc.id);
            });
          }
          if (change.type === 'modified') {
            setHistories((prevHistories) => {
              return prevHistories.map((item) => {
                if (item.id === change.doc.id) {
                  return {
                    ...item,
                    ...change.doc.data(),
                  };
                }
                return item;
              });
            });
          }
        });
      });
  }, [route.name]);
  return (
    <View style={styles.flex1}>
      <View
        style={{
          backgroundColor: theme.colors.itemBackground,
          marginBottom: 1,
        }}>
        <VictoryPie
          colorScale={chartData.map((item) => item.color)}
          data={chartData}
          width={(width * 2) / 3}
          height={(width * 2) / 3}
        />
      </View>
      <FlatList
        data={Object.keys(historiesByCategory)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const icon = categories.find(
            (category) => category.categoryId === item,
          )?.icon;
          return (
            <View
              style={[
                styles.container,
                {
                  backgroundColor: theme.colors.itemBackground,
                },
              ]}>
              <FastImage style={styles.icon} source={icon} />
              <View style={styles.infoContainer}>
                <Text style={styles.title} numberOfLines={1} theme={theme}>
                  {
                    categories.find((category) => category.categoryId === item)
                      ?.name
                  }
                </Text>
                <Text style={styles.total} theme={theme}>
                  {formatCurrency(
                    historiesByCategory[item]
                      .reduce((S: number, i: any) => S + i.total, 0)
                      .toString(),
                  )}
                </Text>
              </View>
            </View>
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
});

export default History;
