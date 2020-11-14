import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useTheme } from '@react-navigation/native';
import inComeCategories from '../configs/inComeCategories';
import outComeCategories from '../configs/outComeCategories';
import FastImage from 'react-native-fast-image';
import {formatCurrency} from "../commons/format";

const History = ({ route }: any) => {
  const [histories, setHistories] = useState<any[]>([]);
  const categories = useMemo(
    () =>
      route.name === 'InComeHistory' ? inComeCategories : outComeCategories,
    [route.name],
  );
  const theme: any = useTheme();
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
    <FlatList
      data={histories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const icon = (
          categories.find(
            (category) => category.categoryId === item.categoryId,
          ) || categories[0]
        ).icon;
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
                {item.description || 'Không có mô tả'}
              </Text>
              <Text style={styles.total} theme={theme}>
                {formatCurrency(item.total.toString())}
              </Text>
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
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
