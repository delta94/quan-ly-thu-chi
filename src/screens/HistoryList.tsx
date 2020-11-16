import React, { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { formatCurrency } from '../commons/format';
import inComeCategories from '../configs/inComeCategories';
import outComeCategories from '../configs/outComeCategories';

const HistoryList = ({ route, navigation }: any) => {
  const theme: any = useTheme();
  const categories = useMemo(
    () =>
      route.params.type === 'InComeHistory'
        ? inComeCategories
        : outComeCategories,
    [route.params.type],
  );
  return (
    <View style={styles.container}>
      <Appbar.Header theme={theme}>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Tình hình thu chi" />
      </Appbar.Header>
      <FlatList
        data={route.params.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const icon = categories.find(
            (category) => category.categoryId === item.categoryId,
          )?.icon;
          return (
            <View
              style={[
                styles.itemContainer,
                {
                  backgroundColor: theme.colors.itemBackground,
                },
              ]}>
              <FastImage style={styles.icon} source={icon} />
              <View style={styles.container}>
                <View style={styles.row}>
                  <Text style={styles.title} numberOfLines={1} theme={theme}>
                    {item.description || 'Không có mô tả'}
                  </Text>
                </View>
                <Text style={styles.total} theme={theme}>
                  {formatCurrency(item.total.toString())}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HistoryList;
