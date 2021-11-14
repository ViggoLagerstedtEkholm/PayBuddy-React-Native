import React from 'react';
import { 
    View, 
    Text,
    StyleSheet
} from 'react-native';

export default function Overview (props) {
    const {title, items, people, location, date} = props.data;

    return (
    <View>
        <Text style={{textAlign: 'center', marginTop: 300}}>Overview Screen</Text>

        <Text>Title : {title}</Text>
        <Text>Items : {items ?? "Not set"}</Text>
        <Text>People : {people ?? "Not set"}</Text>
        <Text>Location : {location ?? "Not set"}</Text>
        <Text>Date : {date ?? "Not set"}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    }
  });