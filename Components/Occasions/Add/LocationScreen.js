import React from 'react';
import { 
    View, 
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default function LocationScreen ({navigation}) {
    return (
    <View>
        <Text style={{textAlign: 'center', marginTop: 300}}>Location Screen</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('People')}
            >
            <Text>Next</Text>
        </TouchableOpacity>
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