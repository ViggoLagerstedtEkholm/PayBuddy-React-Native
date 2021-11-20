import React, {useState, useContext} from 'react';
import uuid from 'react-native-uuid';

import { 
    View, 
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import { PeopleContext } from '../../../Context/PeopleContext';
import { ItemsContext } from '../../../Context/ItemsContext';

export default function AddItemScreen ({navigation, route}) {
    const [title, setTitle] = useState();
    const [cost, setCost] = useState();
    const [quantity, setQuantity] = useState();

    const {setItems} = useContext(ItemsContext);
    const {people} = useContext(PeopleContext);
    const personID = route.params;
    const person = people.find(x => x.key === personID);

    const validate = () =>{
      if(title && cost && quantity){
        if(isNumber(cost) && isNumber(quantity)){
          setItems(oldArray => [...oldArray, 
            {
              Title: title, 
              Cost: cost, 
              Quantity : quantity, 
              Person: person, 
              key : uuid.v4()
          }])
          navigation.navigate({name: 'MultiPageForm'});
        }else{
          Alert.alert('Cost and quantity needs to be numbers');
        }
      }else{
        Alert.alert('Enter all fields');
      }
    }
    
    function isNumber(value){
      return !isNaN(value);
    }

    return (
        <View style={styles.container}>
          <View style={styles.textBox}>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Add Person To Item')}>
                  <Text style={styles.textButton}>Add Person to this item</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.addedPersonBox}>
              <Text style={styles.addedPersonTextInfo}>Person</Text>
              {person ?          
              <View>
                  <Text style={styles.addedPersonText}>{person.name}</Text>
                  <Text style={styles.addedPersonText}>{person.phoneNumber}</Text>
              </View> : 
                <Text style={styles.addedPersonTextInfo}>Not set</Text>
              }
            </View>

            <Text style={styles.text}>Enter title</Text>

            <TextInput
            style={styles.searchBar}
            placeholder="Title"
            value={title}
            onChangeText={title => setTitle(title)}/>

            <Text style={styles.text}>Enter cost</Text>

            <TextInput
            style={styles.searchBar}
            placeholder="Cost"
            value={cost}
            onChangeText={cost => setCost(cost)}/>

            <Text style={styles.text}>Enter quantity</Text>

            <TextInput
            style={styles.searchBar}
            placeholder="Quantity"
            value={quantity}
            onChangeText={quantity => setQuantity(quantity)}/>
        </View>

        <TouchableOpacity
        style={styles.button}
        onPress={() => validate()}>
            <Text style={styles.textButton}>Add Item</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      height: "100%",
      justifyContent: "center",
      backgroundColor: "black",
      display: "flex",
      paddingLeft: 10,
      paddingRight: 10,
    },
    buttonContainer:{
        borderRadius: 25,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: "3%"
    },
    button: {    
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 4,
        width: "100%",
        backgroundColor: 'white',
    },
    textBox:{
      padding: 10,
      justifyContent: "flex-start",
    },
    text: {
      color: "#c6a1e7",
      fontSize: 25,
      marginBottom: 4
    },
    addedPersonBox:{
      backgroundColor: "#3a2d49",
      padding: 10,
      borderRadius: 5,
      marginBottom: 10
    },
    addedPersonTextInfo:{
      color: "white"
    },
    addedPersonText:{
      color: "#c6a1e7",
      fontSize: 25,
      marginTop: 5
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
    searchBar: {
      paddingLeft: 20,
      height: 40,
      flexDirection: "row",
      width: "100%",
      backgroundColor: "white",
      borderRadius: 15,
      marginBottom: 25
    },
  });