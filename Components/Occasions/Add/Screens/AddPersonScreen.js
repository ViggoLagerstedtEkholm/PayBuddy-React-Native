import React, {useState} from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';

export default function AddPersonScreen ({navigation}) {
    const [name, setName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();

    const validate = () =>{
      if(name && phoneNumber){
        if(isNumber(phoneNumber)){
          navigation.navigate({name: 'MultiPageForm', params : {person : {name: name, phoneNumber: phoneNumber}}});
        }else{
          Alert.alert('Invalid phone number');
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
            <Text style={styles.text}>Enter person name</Text>

            <TextInput
            style={styles.searchBar}
            placeholder="Name"
            value={name}
            onChangeText={name => setName(name)}/>

            <Text style={styles.text}>Enter phone number</Text>

            <TextInput
            style={styles.searchBar}
            placeholder="Phone number"
            value={phoneNumber}
            onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}/>
        </View>

        <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => validate()}>
            <Text style={styles.textButton}>Add Person</Text>
        </TouchableOpacity>
        </View>
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
        paddingLeft: 10,
        paddingRight: 10
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
      color: "white",
      fontSize: 30,
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
      height: 50,
      flexDirection: "row",
      width: "100%",
      backgroundColor: "white",
      borderRadius: 15,
      marginBottom: 50
    },
  });