import React from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default function ItemScreen ({navigation}) {
    return (
    <View style={styles.container}>
        <View style={styles.countContainer}>
            <TextInput
                placeholder="Title"
                onChangeText={text => setTitle(text)}
            />
        </View>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Location')}
            >
            <Text>Next</Text>
        </TouchableOpacity>
  </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    },
    countContainer: {
      alignItems: "center",
      padding: 10
    }
  });