import React, { useEffect, useState } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Text } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { remove } from '../services/actions/notify';

const selectNotify = (state: any) => state.notify;

const notifySelector = createSelector(selectNotify, (state: any) => state);

const NotifyItem = ({ notify }: any) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => {
        dispatch(remove(notify.id));
      }, 500);
    }
  }, [dispatch, isVisible, notify.id]);
  return (
    <Modal
      animationInTiming={500}
      animationOutTiming={500}
      animationIn="bounceIn"
      animationOut="bounceOut"
      isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.notifyContainer}>
          <View
            style={[
              styles.titleContainer,
              { backgroundColor: notify.type === 'error' ? 'red' : 'green' },
            ]}>
            <Text style={styles.title}>{notify.title}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{notify.description}</Text>
          </View>
          <Button
            onPress={() => setIsVisible(false)}
            style={[styles.button, { borderTopColor: theme.colors.primary }]}
            theme={theme}>
            Đồng ý
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const Notify = () => {
  const notifies = useSelector(notifySelector);

  return notifies.map((notify: any) => {
    return <NotifyItem key={notify.id} notify={notify} />;
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#FFF',
  },
  descriptionContainer: {
    padding: 15,
  },
  description: {
    fontSize: 20,
    alignSelf: 'center',
  },
  notifyContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  button: {
    borderTopWidth: 1,
    marginHorizontal: -2,
    paddingVertical: 5,
  },
});

export default Notify;
