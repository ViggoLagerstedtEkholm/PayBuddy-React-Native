import React from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from "react-native";

export const VisibleItemWithActions = props =>{
  const {
    data, 
    onClick
  } = props;

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
    <TouchableHighlight style={styles.rowFrontVisible} onPress={onClick}>
        <View>
          <Text style={styles.title} numberOfLines={1}>{data.item.Title}</Text>
          <Text style={styles.details} numberOfLines={1}>{data.item.Description}</Text>
          <Text style={styles.details} numberOfLines={1}>Expiry : {data.item.Expiry}</Text>
          <Text style={styles.status} numberOfLines={1}>{ShowStatus()}</Text>
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
  status:{
    fontSize: 25,
    marginTop: "5%",
    alignSelf: "center",
    color: '#999',
  }
});