import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeTabs from './HomeTabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingScreen from '../screens/tabs/SettingScreen';
import ReportScreen from '../screens/tabs/ReportScreen';
import { useDispatch } from 'react-redux';
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

const Tab = createMaterialBottomTabNavigator();

const MainTabs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const removeListenerInComming = firestore()
      .collection('inComing')
      .where('ownerId', '==', auth().currentUser?.uid)
      .onSnapshot((snapshot) => {
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
      });
    const removeListenerOutComming = firestore()
      .collection('outComing')
      .where('ownerId', '==', auth().currentUser?.uid)
      .onSnapshot((snapshot) => {
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
      });
    return () => {
      removeListenerInComming();
      removeListenerOutComming();
    };
  }, [dispatch]);
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
