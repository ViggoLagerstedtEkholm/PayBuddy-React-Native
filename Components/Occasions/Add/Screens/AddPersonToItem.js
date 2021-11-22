import React, {useContext, useState} from 'react';
import { 
    FlatList, 
    SafeAreaView, 
    StatusBar, 
    StyleSheet, 
    Text, 
    TouchableOpacity
} from 'react-native';

import { PeopleContext } from '../../../Context/PeopleContext';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text>Phone number</Text><Text style={[styles.title, textColor]}>{item.firstName}</Text>
    <Text>Lastname</Text><Text style={[styles.title, textColor]}>{item.lastName}</Text>
    <Text>Phone number</Text><Text style={[styles.title, textColor]}>{item.phoneNumber}</Text>
  </TouchableOpacity>
);

export default function AddPersonToItem ({navigation}) {
    const {people} = useContext(PeopleContext);

    const renderItem = ({ item }) => {

      console.log(item);

        return (
          <Item
            item={item}
            onPress={() => navigation.navigate("Add Item", item.key)}
          />
        );
      };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
            data={people}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      backgroundColor: "#121212"
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      backgroundColor: "#c6a1e7",
      color: "white",
      borderTopEndRadius: 5,
      borderTopLeftRadius: 5
    },
    title: {
      fontSize: 32,
    },
  });
  