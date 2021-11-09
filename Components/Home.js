import React from 'react';
import { 
  StyleSheet, 
  Text,
  SafeAreaView,
  Button
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
        <Text>Home page</Text>
        <Button
            title="Go to Settings"
            onPress={() => navigation.navigate('Settings')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text:{
    fontSize: 35,
    color: 'black'
  }
});
