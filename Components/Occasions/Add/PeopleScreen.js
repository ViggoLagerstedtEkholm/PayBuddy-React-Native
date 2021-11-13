import React from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default function PeopleScreen ({navigation}) {
    return (
    <View>
        <Text style={{textAlign: 'center', marginTop: 300}}>People Screen</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Overview')}
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