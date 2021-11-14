import React, {useState} from 'react';
import { 
    View, 
    StyleSheet,
    Button,
    Text
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateScreen (props) {
    const {onChange, date} = props;

    const onSetDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        onChange(currentDate);
      };

    return (
        <View style={styles.container}>

            <View style={styles.textBox}>
                <Text style={styles.text}>Enter expiry date</Text>
            </View>

            <View style={styles.dateContainer}>
                <DateTimePicker
                style={styles.picker}
                value={date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onSetDate}
                />

                <DateTimePicker
                style={styles.picker}
                datepicker={false}
                value={date}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={onSetDate}/>
            </View>

            <View style={styles.textBox}>
                <Text style={styles.text}>{date.toString()}</Text>
            </View>        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      height: "100%",
      justifyContent: "center",
    },  
    dateContainer : {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        paddingLeft: 2,
        paddingRight: 2
    },
    picker: {    
        flex: 1,
        marginLeft: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 25,
        paddingHorizontal: 25,
        borderRadius: 4,
        height: 50,
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
  });