import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import MainTabs from './MainTabs';
import React from 'react';
import HistoryList from '../screens/HistoryList';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="MainTabs"
        component={MainTabs}
      />
      <Stack.Screen
        name="HistoryList"
        options={{
          title: 'Ghi chép',
          headerBackTitleVisible: false,
        }}
        component={HistoryList}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
