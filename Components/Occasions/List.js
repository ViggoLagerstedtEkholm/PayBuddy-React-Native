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
      // when no input, show all
      if (props.searchPhrase === "") {
        return <Item name={item.name} details={item.details} />;
      }
      // filter of the name
      if (item.name.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return <Item name={item.name} details={item.details} />;
      }
      // filter of the description
      if (item.details.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return <Item name={item.name} details={item.details} />;
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