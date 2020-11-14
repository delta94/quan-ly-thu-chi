import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IncomeScreen from '../screens/tabs/IncomeScreen';

const Tab = createMaterialTopTabNavigator();

const HomeTab = () => (
  <Tab.Navigator>
    <Tab.Screen name="IncomeScreen" component={IncomeScreen} />
    <Tab.Screen name="OutcomeScreen" component={IncomeScreen} />
  </Tab.Navigator>
);

export default HomeTab;
