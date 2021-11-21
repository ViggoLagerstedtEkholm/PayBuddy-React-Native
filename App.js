import React, {useState, useMemo, useEffect} from 'react';

import { 
  StyleSheet, 
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

import MultiPageForm from './Components/Occasions/Add/MultiStepForm/MultiPageForm';
import AddItemScreen from './Components/Occasions/Add/Screens/AddItemScreen';
import AddPersonScreen from './Components/Occasions/Add/Screens/AddPersonScreen';
import AddPersonToItem from './Components/Occasions/Add/Screens/AddPersonToItem';

import { PeopleContext } from './Components/Context/PeopleContext';
import { ItemsContext } from './Components/Context/ItemsContext';
import { configureTables, DeleteItem, DeleteOccasion, dropTables, getAll } from './Components/SQL/DBHelper';
import { OccasionInspect } from './Components/Occasions/Inspect/OccasionInspect';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function OccasionStack(){
  const [people, setPeople] = useState([{firstName : "firstName1", lastName : "lastName1", phoneNumber: "number1", key: 1}]);
  const peopleItems = useMemo(() => ({people, setPeople}), [people, setPeople]);

  const [items, setItems] = useState([]);
  const occasionItems = useMemo(() => ({items, setItems}), [items, setItems]);

  return(
    <PeopleContext.Provider value={peopleItems}>
      <ItemsContext.Provider value={occasionItems}>
        <Stack.Navigator initialRouteName="Main"    
            screenOptions={
              {
              tabBarStyle:{
                backgroundColor: '#1c1c1c',
              },
              headerStyle:{
                backgroundColor: '#1c1c1c',
              },
            headerTintColor: '#fff'}}>
          <Stack.Screen name="Main" component={Search}/>
          <Stack.Screen name="MultiPageForm" component={MultiPageForm}/>
          <Stack.Screen name="Add Item" component={AddItemScreen}/>
          <Stack.Screen name="Add Person" component={AddPersonScreen}/>
          <Stack.Screen name="Add Person To Item" component={AddPersonToItem}/>
        </Stack.Navigator>
      </ItemsContext.Provider>
    </PeopleContext.Provider>
  )
}

export default function App() {

  useEffect(() => {
    //dropTables();
    configureTables();
    getAll();
  }, []);

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
  },
});