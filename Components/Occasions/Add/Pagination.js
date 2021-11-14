import React from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const WINDOW_HEIGHT = Dimensions.get('window').height;

export default function Pagination (props) {
  const {nextStep, previousStep} = props;

    return (
        <View style={styles.footer}>
            <View style={styles.container}>
            {previousStep ?    
            <TouchableOpacity
            style={styles.button}
            onPress={() => previousStep()}>
                <Text style={styles.text}>Previous</Text>
            </TouchableOpacity> : null}

            {nextStep ?    
            <TouchableOpacity
            style={styles.button}
            onPress={() => nextStep()}>
                <Text style={styles.text}>Next</Text>
            </TouchableOpacity> : null}

            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container : {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10
    },
    button: {    
        flex: 1,
        marginLeft: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        width: "100%",
        backgroundColor: 'white',
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
      },
      footer: {
        position: 'absolute',
        height: 200,
        left: 0, 
        top: WINDOW_HEIGHT - 270, 
        width: "100%",
    }
});