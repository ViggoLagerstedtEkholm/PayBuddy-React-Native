import React from "react";

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
          <Text style={styles.title} numberOfLines={1}>{data.item.title}</Text>
          <Text style={styles.details} numberOfLines={1}>{data.item.value}</Text>
        </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  rowFrontVisible: {
    backgroundColor: '#FFF',
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