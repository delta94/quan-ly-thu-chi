import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View } from 'react-native';
import History from '../components/History';

const Tab = createMaterialTopTabNavigator();

const HistoryTabs = () => (
  <View style={styles.container}>
    <Tab.Navigator>
      <Tab.Screen
        name="OutComeHistory"
        options={{
          title: 'Chi Tiền',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
        component={History}
      />
      <Tab.Screen
        name="InComeHistory"
        options={{
          title: 'Thu Tiền',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
        component={History}
      />
    </Tab.Navigator>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HistoryTabs;
