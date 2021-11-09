import React from 'react';
import { 
  StyleSheet, 
  Text,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Components/Home';
import Settings from './Components/Settings';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">

          <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Overview' }}
          />

          <Stack.Screen name="Settings" component={Settings} options={{ title: 'Settings' }}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text:{
    fontSize: 35,
    color: 'black'
  }
});
