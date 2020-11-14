import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InOutComeScreen from '../screens/tabs/InOutComeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Appbar.Header theme={theme}>
        <Appbar.Content title="Nhập khoản thu chi" />
      </Appbar.Header>
      <Tab.Navigator>
        <Tab.Screen
          name="OutComeScreen"
          options={{
            title: 'Chi Tiền',
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}
          component={InOutComeScreen}
        />
        <Tab.Screen
          name="InComeScreen"
          options={{
            title: 'Thu Tiền',
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}
          component={InOutComeScreen}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeTabs;
