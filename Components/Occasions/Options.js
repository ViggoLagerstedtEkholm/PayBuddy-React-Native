import React from "react";
import {
    StyleSheet,
    View,
    Button,
    Text,
    TouchableHighlight
} from "react-native";

import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

const Options = (props) => {
    return (
      <View style={styles.options}>
        <TouchableHighlight 
        onPressIn={() => }
        onPress={()=>{            
            props.setFilterOption(1);
            }}>
            <View>
                <FontAwesome name="list-alt" size={30} color={"#FAFAFA"} />           
            </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>{            
            props.setFilterOption(2);
            }}>
            <View>
                <MaterialIcons name="pending-actions" size={30} color={"#FAFAFA"} />        
            </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>{
            props.setFilterOption(3);
            }}>
            <View>
                <FontAwesome name="history" size={30} color={"#FAFAFA"} />
            </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>{            
            props.setFilterOption(4);
            }}>
            <View>
                <AntDesign name="warning" size={30} color={"#FAFAFA"}/>            
            </View>
        </TouchableHighlight>
        
      </View>
    );
  };

  export default Options;

  const styles = StyleSheet.create({
    options: { 
        display: "flex",
        borderWidth: 1, 
        borderColor: 'white',
        borderRadius: 4, 
        padding: 10,
        flexDirection: "row",
        width: "100%", 
        justifyContent: "space-around",
    },
    button:{
        backgroundColor: "yellow",
        borderColor: '#fff',
        justifyContent: "center",
        alignItems: 'center'
    }
  });
  