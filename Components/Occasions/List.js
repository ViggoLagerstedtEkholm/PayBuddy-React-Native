import React from "react";

import {
    StyleSheet,
    View,
    FlatList,
    SafeAreaView,
} from "react-native";

import Item from './Item';
  
const List = (props) => {
    const renderItem = ({ item }) => {
      if(item.status === props.filterOption || props.filterOption === 1){
        if (props.searchPhrase === "") {
            return <Item title={item.title} value={item.value} status={item.status}/>;
          }
          if (item.title.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
            return <Item title={item.title} value={item.value} status={item.status}/>;
          }
          if (item.value.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
            return <Item title={item.title} value={item.value} status={item.status}/>;
          }
      }
    };
  
    return (
      <SafeAreaView style={styles.list__container}>
        <View
          onStartShouldSetResponder={() => {
            props.setClicked(false);
          }}>

          <FlatList
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    );
  };
  
  export default List;
  
  const styles = StyleSheet.create({
    list__container: {
      margin: 13,
      height: "70%",
      width: "100%",
    },
    item: {
      margin: 30,
      borderBottomWidth: 2,
      borderBottomColor: "lightgrey"
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
      fontStyle: "italic",
    },
  });