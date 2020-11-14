import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Pressable,
  ScrollView,
  View,
  Alert,
  StatusBar,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text, TextInput, Button } from 'react-native-paper';
import { FlatGrid } from 'react-native-super-grid';
import outComeCategories from '../../configs/outComeCategories';
import FastImage from 'react-native-fast-image';
import { saveOutComing } from '../../services/outComming';
import inComeCategories from '../../configs/inComeCategories';
import { saveInComing } from '../../services/inComming';
import { formatCurrency, removeComas } from '../../commons/format';

const InOutComeScreen = (props: any) => {
  const [description, setDescription] = useState<string>('');
  const [total, setTotal] = useState<string>('0');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const theme = useTheme();
  const onChangeTotal = useCallback((value: string) => {
    setTotal((parseInt(removeComas(value), 10) || 0).toString());
  }, []);
  const onPressSave = useCallback(async () => {
    if (selectedCategory === -1) {
      return Alert.alert('Lẩu rầu', 'Vui lòng chọn danh mục');
    }
    try {
      setIsLoading(true);
      const data = {
        categoryId:
          props.route.name === 'OutComeScreen'
            ? outComeCategories[selectedCategory].categoryId
            : inComeCategories[selectedCategory].categoryId,
        total: parseInt(total, 10) || 0,
        description,
      };
      if (props.route.name === 'OutComeScreen') {
        await saveOutComing(data);
      } else {
        await saveInComing(data);
      }
      Alert.alert('Thông báo', 'Lưu thành công');
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, total, description, props.route.name]);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="interactive"
        style={styles.scrollView}>
        <TextInput
          placeholder="Ghi chú"
          label="Ghi chú"
          mode="outlined"
          style={styles.input}
          theme={theme}
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          placeholder="Số tiền"
          label="Số tiền"
          mode="outlined"
          style={styles.inputTotal}
          theme={theme}
          value={formatCurrency(total)}
          onChangeText={onChangeTotal}
          keyboardType="numeric"
        />
        <Text style={styles.categoryTitle} theme={theme}>
          Danh mục
        </Text>
        <View>
          <FlatGrid
            data={
              props.route.name === 'OutComeScreen'
                ? outComeCategories
                : inComeCategories
            }
            scrollEnabled={false}
            renderItem={({ item, index }) => {
              return (
                <Pressable onPress={() => setSelectedCategory(index)}>
                  <View
                    style={[
                      styles.categoryContainer,
                      {
                        borderColor: theme.colors.primary,
                        backgroundColor:
                          index === selectedCategory
                            ? theme.colors.primary + '30'
                            : theme.colors.background,
                      },
                    ]}>
                    <FastImage source={item.icon} style={styles.icon} />
                    <Text theme={theme}>{item.name}</Text>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
        <Button
          icon="plus"
          mode="contained"
          style={styles.button}
          disabled={isLoading}
          loading={isLoading}
          onPress={onPressSave}>
          Nhập khoản {props.route.name === 'OutComeScreen' ? 'Chi' : 'Thu'}
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingVertical: 10,
  },
  input: {
    marginHorizontal: 10,
  },
  inputTotal: {
    marginHorizontal: 10,
    fontSize: 30,
    textAlign: 'right',
    marginTop: 10,
  },
  icon: {
    height: 24,
    width: 24,
  },
  categoryContainer: {
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
  },
  button: {
    marginVertical: 15,
    paddingVertical: 6,
    marginHorizontal: 10,
  },
});

export default InOutComeScreen;
