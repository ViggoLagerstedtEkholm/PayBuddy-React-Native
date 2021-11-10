import React from 'react';
import { 
  StyleSheet, 
  Button,
  ScrollView
} from 'react-native';

import Statistic from './Statistic';

export default function Home() {
  return (
        <ScrollView style={styles.container}>
            <Statistic name="Sum of all occasions" value="15525.5 kr"/>
            <Statistic name="Total unpaind" value="125.5 kr"/> 
            <Statistic name="Total history" value="1555 kr"/>
            <Statistic name="Total expired" value="1256.5 kr"/>     
        </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#121212',
    paddingTop: 20
  },

  map: {
    height: "20%"
  }
});
