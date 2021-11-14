import React from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from "react-native";

export const ItemPreview = props =>{
    const {cost, quantity, title} = props.data.item;

    return (
    <TouchableHighlight style={styles.rowFrontVisible}>
        <View>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.details} numberOfLines={1}>Cost -  {cost}</Text>
            <Text style={styles.details} numberOfLines={1}>Quantity - {quantity}</Text>
            <Text style={styles.details} numberOfLines={1}>Assigned person - PERSON</Text>
        </View>
    </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
  rowFrontVisible: {
    backgroundColor: "#3a2d49",
    borderRadius: 5,
    height: 150,
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
});