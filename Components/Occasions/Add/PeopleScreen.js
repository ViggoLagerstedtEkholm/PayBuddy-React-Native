import React from 'react';
import { 
    View, 
    Text,
    StyleSheet
} from 'react-native';

export default function PeopleScreen (props) {
    const {onChange, people} = props;

    return (
    <View>
        <Text style={{textAlign: 'center', marginTop: 300}}>People Screen</Text>
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