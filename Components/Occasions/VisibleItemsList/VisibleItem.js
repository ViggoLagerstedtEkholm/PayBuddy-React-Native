import React, {useState} from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

export const VisibleItem = props =>{
  const {data, onClicked} = props;

  const ShowStatus = () =>{
    if(data.item.IsExpired === 1){
      return (<Text>Expired</Text>)
    }

    if(data.item.IsPaid === 1){
      return (<Text>History</Text>)
    }

    if(data.item.IsPaid === 0 && data.item.IsExpired === 0){
      return (<Text>Active</Text>)
    }
  }

  return (
    <TouchableOpacity style={styles.rowFrontVisible} onPress={onClicked(data.item.ID)}>
        <View>
          <Text style={styles.title} numberOfLines={1}>{data.item.Title}</Text>
          <Text style={styles.details} numberOfLines={1}>{data.item.Description}</Text>
          <Text style={styles.details} numberOfLines={1}>Expiry : {data.item.Expiry}</Text>
          <Text style={styles.status} numberOfLines={1}>{ShowStatus()}</Text>
        </View>
    </TouchableOpacity>
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
  status:{
    fontSize: 25,
    marginTop: "5%",
    alignSelf: "center",
    color: '#999',
  }
});