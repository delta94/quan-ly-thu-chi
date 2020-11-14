import React from 'react';
import { useTheme } from '@react-navigation/native';
import {Dimensions, StyleSheet, View, Text, ScrollView} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Appbar } from 'react-native-paper';
import HistoryTabs from '../../routers/HistoryTabs';

const { width } = Dimensions.get('window');

const data = [
  {
    name: 'Seoul',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Beijing',
    population: 527612,
    color: 'red',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    population: 8538000,
    color: 'green',
    legendFontColor: 'green',
    legendFontSize: 15,
  },
];

const ReportScreen = () => {
  const theme: any = useTheme();

  return (
    <View style={styles.container}>
      <Appbar.Header theme={theme}>
        <Appbar.Content title="Tình hình thu chi" />
      </Appbar.Header>
      <ScrollView>
        <Text style={styles.outComingLabel}>Top danh mục chi</Text>
        <View style={{ backgroundColor: theme.colors.itemBackground }}>
          <PieChart
            data={data}
            width={width - 40}
            height={180}
            chartConfig={{
              backgroundColor: theme.colors.itemBackground,
              backgroundGradientFrom: theme.colors.itemBackground,
              backgroundGradientTo: theme.colors.itemBackground,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            accessor="population"
            backgroundColor={theme.colors.itemBackground}
            paddingLeft="15"
            absolute
          />
        </View>
        <Text style={styles.outComingLabel}>Lịch sử</Text>
        <HistoryTabs />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  outComingLabel: {
    padding: 10,
    fontSize: 16,
  },
});
export default ReportScreen;
