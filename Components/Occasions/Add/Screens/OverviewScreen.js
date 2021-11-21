import React, { useContext } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { ItemsContext } from '../../../Context/ItemsContext';
import { PeopleContext } from '../../../Context/PeopleContext';
import { insertOccasion } from '../../../SQL/DBHelper';

export default function Overview (props) {
    const {goBack} = props.navigation;
    const {title, location, date} = props.data;

    const {people, setPeople} = useContext(PeopleContext);
    const {items, setItems} = useContext(ItemsContext);

    const itemsCount = items.length;
    const peopleCount = people.length;

    const {latitude, longitude, altitude} = location.coords;

    let totalCost = 0;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        totalCost += item.cost * item.quantity;
    }

    const publish = () =>{
        //Save to db...
        const occasion = 
        {
            Title: title, 
            Description: 'Made up description', 
            Expiry: date.toString(), 
            IsPaid : 0, 
            IsExpired : 0,
            Items : items,
            Location: {
                latitude : latitude,
                longitude : longitude,
                altitude : altitude
            }
        }
        
        insertOccasion(occasion).then(() => {
            setItems([]);
            setPeople([]);
            goBack();
        }).catch(error =>{
            alert('Error occured!');
        });
    }

    return (
    <View style={styles.container}>
        <Text style={styles.paragraph}><Text style={styles.overview}>Overview</Text></Text>
        <Text style={styles.paragraph}><Text style={styles.title}>Title</Text> : {title}</Text>
        <Text style={styles.paragraph}><Text style={styles.title}>Amount of People</Text> : {peopleCount}</Text>
        <Text style={styles.paragraph}><Text style={styles.title}>Amount of Items</Text> : {itemsCount}</Text>
        <Text style={styles.paragraph}><Text style={styles.title}>Latitude</Text> : {latitude}</Text>
        <Text style={styles.paragraph}><Text style={styles.title}>Longitude</Text> : {longitude}</Text>
        <Text style={styles.paragraph}><Text style={styles.title}>Altitude</Text> : {altitude}</Text>
        <Text style={styles.paragraph}><Text style={styles.title}>Total Cost</Text> : {totalCost}</Text>
        <Text style={styles.paragraph}><Text style={styles.title}>Expiry Date</Text> : {date.toString()}</Text>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => publish()}>
                <Text style={styles.buttonText}>Publish</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent: "center",
        padding: 20
      },  
      paragraph: {
        color: "white",
        fontSize: 18,
        textAlign: 'left',
      },
      overview:{
        fontSize: 30,
        color: "#c6a1e7"
      },
      title:{
          fontSize: 25,
          color: "#c6a1e7"
      },
      button: {
        marginLeft: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        width: "100%",
        backgroundColor: '#c6a1e7',
      },
      buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
      },
      buttonContainer : {
        width: "100%",
        display: "flex",
        marginTop: 25,
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10
    }
  });