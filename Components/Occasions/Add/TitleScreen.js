import React from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default function TitleScreen (props) {
    const {onChange, title} = props;

    return (
        <View style={styles.container}>

          <View style={styles.textBox}>
            <Text style={styles.text}>Enter title</Text>
          </View>

            <View>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Title"
                    value={title}
                    onChangeText={text => onChange(text)}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      height: "100%",
      justifyContent: "center",
    },
    textBox:{
      padding: 10,
      justifyContent: "flex-start",
    },
    text: {
      color: "white",
      fontSize: 30,
    },
    searchBar: {
      paddingLeft: 20,
      height: 60,
      flexDirection: "row",
      width: "100%",
      backgroundColor: "white",
      borderRadius: 15,
      marginBottom: 50
    },
  });