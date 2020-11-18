import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeTabs from './HomeTabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingScreen from '../screens/tabs/SettingScreen';
import ReportScreen from '../screens/tabs/ReportScreen';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  addInComming,
  addOutComming,
  deleteInComming,
  deleteOutComming,
  updateInComming,
  updateOutComming,
} from '../services/actions/money';
import RecentScreen from '../screens/tabs/RecentScreen';
import { createSelector } from '@reduxjs/toolkit';
import moment from 'moment';
import { resetStore, setLoading } from '../services/actions/reset';

const Tab = createMaterialBottomTabNavigator();

const moneySelector = (state: any) => state.money;

const reportTypeSelector = createSelector(
  moneySelector,
  (money) => money.reportType,
);

const MainTabs = () => {
  const dispatch = useDispatch();
  const reportType = useSelector(reportTypeSelector);
  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(resetStore());
    const start = moment()
      .subtract(reportType === 0 ? 7 : 30, 'days')
      .toDate();
    const removeListenerInComming = firestore()
      .collection('inComing')
      .where('ownerId', '==', auth().currentUser?.uid)
      .where('date', '>', start)
      .onSnapshot((snapshot) => {
        if (!snapshot) {
          return;
        }
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            dispatch(addInComming({ id: change.doc.id, ...change.doc.data() }));
          }
          if (change.type === 'removed') {
            dispatch(
              deleteInComming({ id: change.doc.id, ...change.doc.data() }),
            );
          }
          if (change.type === 'modified') {
            dispatch(
              updateInComming({ id: change.doc.id, ...change.doc.data() }),
            );
          }
        });
        setTimeout(() => dispatch(setLoading(false)), 1000);
      });
    const removeListenerOutComming = firestore()
      .collection('outComing')
      .where('ownerId', '==', auth().currentUser?.uid)
      .where('date', '>', start)
      .onSnapshot((snapshot) => {
        if (!snapshot) {
          return;
        }
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            dispatch(
              addOutComming({ id: change.doc.id, ...change.doc.data() }),
            );
          }
          if (change.type === 'removed') {
            dispatch(
              deleteOutComming({ id: change.doc.id, ...change.doc.data() }),
            );
          }
          if (change.type === 'modified') {
            dispatch(
              updateOutComming({ id: change.doc.id, ...change.doc.data() }),
            );
          }
        });
        setTimeout(() => dispatch(setLoading(false)), 1000);
      });
    return () => {
      removeListenerInComming();
      removeListenerOutComming();
    };
  }, [dispatch, reportType]);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeTabs}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="RecentTab"
        component={RecentScreen}
        options={{
          tabBarLabel: 'Ghi chép',
          tabBarIcon: ({ color }) => (
            <Icon name="history" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ReportTab"
        component={ReportScreen}
        options={{
          tabBarLabel: 'Báo cáo',
          tabBarIcon: ({ color }) => (
            <Icon name="pie-chart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Cài đặt',
          tabBarIcon: ({ color }) => (
            <Icon name="bars" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
