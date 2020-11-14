import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InOutComeScreen from '../screens/tabs/InOutComeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="OutComeScreen"
      options={{
        title: 'Chi Tiền',
        tabBarIcon: ({ color }) => <Icon name="home" color={color} size={26} />,
      }}
      component={InOutComeScreen}
    />
    <Tab.Screen
      name="InComeScreen"
      options={{
        title: 'Thu Tiền',
        tabBarIcon: ({ color }) => <Icon name="home" color={color} size={26} />,
      }}
      component={InOutComeScreen}
    />
  </Tab.Navigator>
);

export default HomeTabs;
