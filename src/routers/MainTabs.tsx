import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeTabs from './HomeTabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingScreen from '../screens/tabs/SettingScreen';

const Tab = createMaterialBottomTabNavigator();

const MainTabs = () => {
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
        name="ReportTab"
        component={HomeTabs}
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
          tabBarLabel: 'Báo cáo',
          tabBarIcon: ({ color }) => (
            <Icon name="bars" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
