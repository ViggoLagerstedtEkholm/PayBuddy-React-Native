import React from 'react';
import { 
  StyleSheet, 
  Text,
  SafeAreaView,
  Settings
} from 'react-native';

export default function Statistic(props){
  const {name, value, format, activeCurrency} = props;

  if(format){
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: activeCurrency,
    });
  
    const valueFormatted = formatter.format(value);  

    return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.value}>{valueFormatted}</Text>
      </SafeAreaView>
    );
  }else{
    return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.value}>{value}</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3a2d49',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
    alignItems: 'flex-start',
    paddingStart: 15,
    marginVertical: 4,
    margin: 10,
    height: 100,
    width: "100%",
    borderRadius: 10,
    justifyContent: 'center',
  },

  title: {
    fontSize: 25,
    color: "#c6a1e7"
  },

  value: {
      fontSize: 25,
      color: "#b2adb8"
  }
});
