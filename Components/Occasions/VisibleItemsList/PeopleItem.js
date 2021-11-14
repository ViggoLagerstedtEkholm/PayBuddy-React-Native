import React from "react";

import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from "react-native";

  export const PeopleItem = props =>{
    const {name, phoneNumber} = props.data.item;
    console.log(props);

    return (
        <TouchableHighlight style={styles.rowFrontVisible}>
            <View>
            <Text style={styles.title} numberOfLines={1}>{name}</Text>
            <Text style={styles.details} numberOfLines={1}>{phoneNumber}</Text>
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
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
});