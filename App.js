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
import Search from './Components/Occasions/Search';
import Map from './Components/Maps/Map';
import TitleScreen from './Components/Occasions/Add/TitleScreen';
import ItemScreen from './Components/Occasions/Add/ItemScreen';
import LocationScreen from './Components/Occasions/Add/LocationScreen';
import PeopleScreen from './Components/Occasions/Add/PeopleScreen';
import Overview from './Components/Occasions/Add/Overview';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function OccasionStack(){
  return(
    <Stack.Navigator initialRouteName="Occasions">
      <Stack.Screen name="Occasions" component={Search}/>
      <Stack.Screen name="Title" component={TitleScreen}/>
      <Stack.Screen name="Items" component={ItemScreen}/>
      <Stack.Screen name="Location" component={LocationScreen}/>
      <Stack.Screen name="People" component={PeopleScreen}/>
      <Stack.Screen name="Overview" component={Overview}/>
    </Stack.Navigator>
  )
}

export default function App() {

  const color =  '#b700ff';

  return (
      <NavigationContainer>
        <Tab.Navigator 
            initialRouteName="Overview"
            screenOptions={
              {
              tabBarStyle:{
                backgroundColor: '#1c1c1c',
              },
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
                <AntDesign name="setting" size={22} color={color} />            
            ),
          }}
          />
          <Tab.Screen 
          name="Overview" 
          component={Home}
          options={{
            tabBarLabel: 'Overview',
            tabBarIcon: () => (            
               <MaterialCommunityIcons name="database" size={22} color={color}/>
            ),
          }}
          />
          <Tab.Screen 
          name="Search" 
          component={OccasionStack}
          options={{
            tabBarLabel: 'Occasions',
            tabBarIcon: () => (            
                <AntDesign name="book" size={22} color={color} />            
            ),
          }}
          />

        <Tab.Screen 
          name="Map" 
          component={Map}
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: () => (            
                <AntDesign name="enviromento" size={22} color={color} />
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