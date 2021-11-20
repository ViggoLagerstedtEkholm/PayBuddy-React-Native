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
    <TouchableOpacity 
    onPress={onPress} 
    style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
    <Text style={[styles.title, textColor]}>{item.phoneNumber}</Text>
  </TouchableOpacity>
);

export default function AddPersonToItem ({navigation}) {
    const [selectedId, setSelectedId] = useState(null);

    const {people} = useContext(PeopleContext);

    const renderItem = ({ item }) => {
        const backgroundColor = item.key === selectedId ? "#6e3b6e" : "#f9c2ff";
        const color = item.key === selectedId ? 'white' : 'black';

        return (
          <Item
            item={item}
            onPress={() => navigation.navigate("Add Item", item.key)}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
          />
        );
      };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
            data={people}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            extraData={selectedId}
            />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
  