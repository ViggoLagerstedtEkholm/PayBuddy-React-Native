import React from 'react';
import { 
  StyleSheet, 
  Button,
  Text,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Components/Home/Home';
import Settings from './Components/Settings/Settings';
import Occasions from './Components/Occasions/Occasions';
import Map from './Components/Maps/Map';

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const color =  '#63008a';

  return (
      <NavigationContainer>
        <Tab.Navigator 
            initialRouteName="Overview"
            screenOptions={
              {
              headerStyle:{
                backgroundColor: '#1c1c1c',
              },
            headerTintColor: '#fff',
          }}>

          <Tab.Screen 
          name="Settings" 
          component={Settings}
          backgroundColor="#1c1c1c"
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: () => (            
                <AntDesign name="setting" size={24} color={color} />            
            ),
          }}
          />
          <Tab.Screen 
          name="Overview" 
          component={Home}
          options={{
            tabBarLabel: 'Overview',
            tabBarIcon: () => (            
               <MaterialCommunityIcons name="database" color={color} size={26} />
            ),
          }}
          />
          <Tab.Screen 
          name="Occasions" 
          component={Occasions}
          options={{
            tabBarLabel: 'Occasions',
            tabBarIcon: () => (            
                <AntDesign name="book" size={24} color={color} />            
            ),
          }}
          />

        <Tab.Screen 
          name="Map" 
          component={Map}
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: () => (            
                <AntDesign name="enviromento" size={24} color="black" />
            ),
          }} />

        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  topNav: {
    backgroundColor: "#FAFAFA",
    fontSize: 50
  }
});