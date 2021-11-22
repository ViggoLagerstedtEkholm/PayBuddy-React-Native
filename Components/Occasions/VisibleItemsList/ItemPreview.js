import React from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from "react-native";

export const ItemPreview = props =>{
    const { Cost, Quantity, Title, Person } = props.data.item;
    const { firstName, lastName, phoneNumber } = Person;

    return (
    <TouchableHighlight style={styles.rowFrontVisible}>
        <View>
            <Text style={styles.title} numberOfLines={1}>{Title}</Text>
            <Text style={styles.description}>Cost</Text><Text style={styles.details} numberOfLines={1}>{Cost}</Text>
            <Text style={styles.description}>Quantity</Text><Text style={styles.details} numberOfLines={1}>{Quantity}</Text>
            <Text style={styles.description}>Firstname</Text><Text style={styles.details} numberOfLines={1}>{firstName}</Text>
            <Text style={styles.description}>Lastname</Text><Text style={styles.details} numberOfLines={1}>{lastName}</Text>
            <Text style={styles.description}>Phone number </Text><Text style={styles.details} numberOfLines={1}>{phoneNumber}</Text>
        </View>
    </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
  rowFrontVisible: {
    backgroundColor: "#3a2d49",
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  details: {
    fontSize: 16,
    color: '#999',
  },
  description:{
    color: "#c6a1e7"
  }
});