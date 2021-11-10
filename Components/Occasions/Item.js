import React from 'react';
import { 
  StyleSheet, 
  SafeAreaView,
  Text
} from 'react-native';

export default function Item({ name, details }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.value}>{details}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#3a2d49',
      paddingStart: 20,
      paddingVertical: 20,
      marginVertical: 4,
      marginStart: 10,
      marginEnd: 10,
      height: 200,
      borderRadius: 10,
    },
  
    title: {
      fontSize: 25,
      color: "#c6a1e7"
    },
  
    value: {
        fontSize: 15,
        color: "#b2adb8"
    }
  });
  