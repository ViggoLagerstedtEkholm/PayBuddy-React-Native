import React, {useState} from "react";

import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from "react-native";

export const VisibleItem = props =>{
  const {data} = props;

  return (
    <TouchableHighlight style={styles.rowFrontVisible}>
        <View>
          <Text style={styles.title} numberOfLines={1}>{data.item.Title}</Text>
          <Text style={styles.details} numberOfLines={1}>{data.item.Description}</Text>
          <Text style={styles.details} numberOfLines={1}>Expiry : {data.item.Expiry}</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#c6a1e7',
  },
  details: {
    fontSize: 14,
    color: '#999',
  },
});