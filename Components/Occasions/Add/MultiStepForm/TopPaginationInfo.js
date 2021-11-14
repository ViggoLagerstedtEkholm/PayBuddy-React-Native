import React from 'react';
import { 
    View, 
    Text,
    StyleSheet
} from 'react-native';

export default function TopPaginationInfo (props) {
  const {totalSteps, step} = props;

    return (
        <View style={styles.header}>
            <Text style={styles.text}>{step} / {totalSteps}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
      text: {
        fontSize: 25,
        lineHeight: 25,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
      header: {
        position: 'absolute',
        height: 200,
        left: 0, 
        top: 10, 
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
});