import React from 'react';
import { 
    View, 
    StyleSheet,
    TextInput,
    Text
} from 'react-native';

export default function LocationScreen (props) {
    const {onChange, location} = props;

    return (
        <View style={styles.container}>
                <Text style={styles.text}>TEST</Text>
            <View>
                <TextInput
                    placeholder="Location"
                    value={location}
                    onChangeText={item => onChange(item)}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
  },
  text: {
    color: "white"
  }
});