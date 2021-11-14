import React, {useState} from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default function AddItemScreen ({navigation}) {
    const [title, setTitle] = useState();
    const [cost, setCost] = useState();
    const [quantity, setQuantity] = useState();

    return (
        <View style={styles.container}>
        <View style={styles.textBox}>
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

        <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate({name: 'MultiPageForm', params : {testItem : {title: title, cost: cost, quantity : quantity}}})}>
            <Text style={styles.textButton}>Add Item</Text>
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