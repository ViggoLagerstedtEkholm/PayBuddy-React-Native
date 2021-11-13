import React from 'react';
import { 
    View, 
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default function Overview ({navigation}) {
    return (
    <View>
        <Text style={{textAlign: 'center', marginTop: 300}}>Overview Screen</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                navigation.popToTop();
                navigation.navigate('Occasions');
                
            }}
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