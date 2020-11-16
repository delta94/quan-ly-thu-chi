import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { Pressable, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from 'react-native-paper';
import moment from 'moment';
import { useTheme } from '@react-navigation/native';

const DatePicker = ({ date, setDate }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const theme: any = useTheme();
  return (
    <View>
      <Pressable onPress={() => setIsVisible(true)}>
        <View
          style={[
            styles.dateContainer,
            styles.row,
            { borderColor: theme.colors.primary },
          ]}>
          <Text style={[styles.dateLabel, { color: theme.colors.primary }]}>
            Chọn ngày
          </Text>
          <Text style={[styles.dateLabel, { color: theme.colors.primary }]}>
            {moment(date || new Date()).format('DD/MM/YYYY')}
          </Text>
        </View>
      </Pressable>
      <Modal
        style={styles.container}
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        onDismiss={() => setIsVisible(false)}>
        <View style={[styles.modal]}>
          <View
            style={[
              styles.headerContainer,
              { borderColor: theme.colors.primary },
            ]}>
            <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>
              Chọn ngày
            </Text>
            <Pressable onPress={() => setIsVisible(false)}>
              <Text
                style={[styles.headerTitle, { color: theme.colors.primary }]}>
                Đóng
              </Text>
            </Pressable>
          </View>
          <DateTimePicker
            value={date || new Date()}
            mode={'date'}
            locale="vi-VN"
            display="default"
            onChange={(event, d) => setDate(d)}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0,
  },
  dateContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  dateLabel: {
    fontSize: 18,
  },
  modal: {
    paddingBottom: 20,
    backgroundColor: '#FFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainer: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default DatePicker;
