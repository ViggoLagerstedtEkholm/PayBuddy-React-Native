import React, { useState } from "react";
import {
    StyleSheet,
    View,
    TouchableHighlight
} from "react-native";

import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

const Options = (props) => {
    const [allPressed, setAllPressed] = useState(false);
    const [pendingPressed, setPendingPressed] = useState(false);
    const [historyPressed, setHistoryPressed] = useState(false);
    const [expiredPressed, setExpiredPressed] = useState(false);

    return (
      <View style={styles.options}>
        <TouchableHighlight style={allPressed ? styles.buttonActive : styles.buttonDefault}
            onPress={()=>{            
                props.setFilterOption(1);
                setAllPressed(true);
                setPendingPressed(false);
                setHistoryPressed(false);
                setExpiredPressed(false);
            }}>
            <View>
                <FontAwesome name="list-alt" size={30} color={"#FAFAFA"} />           
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={pendingPressed ? styles.buttonActive : styles.buttonDefault}
            onPress={()=>{            
                props.setFilterOption(2);
                setAllPressed(false);
                setPendingPressed(true);
                setHistoryPressed(false);
                setExpiredPressed(false);
            }}>
            <View>
                <MaterialIcons name="pending-actions" size={30} color={"#FAFAFA"} />        
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={historyPressed ? styles.buttonActive : styles.buttonDefault}
            onPress={()=>{
                props.setFilterOption(3);
                setAllPressed(false);
                setPendingPressed(false);
                setHistoryPressed(true);
                setExpiredPressed(false);
            }}>
            <View>
                <FontAwesome name="history" size={30} color={"#FAFAFA"} />
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={expiredPressed ? styles.buttonActive : styles.buttonDefault}
            onPress={()=>{            
            props.setFilterOption(4);
            setAllPressed(false);
            setPendingPressed(false);
            setHistoryPressed(false);
            setExpiredPressed(true);
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
        padding: 10,
        flexDirection: "row",
        width: "100%", 
        justifyContent: "space-around",
    },
    buttonDefault:{
        padding: 10,
        display: "flex",
        justifyContent: "space-evenly",
    },
    buttonActive:{
        padding: 10,
        display: "flex",
        justifyContent: "space-evenly",
        backgroundColor: "gray",
        borderRadius: 5
    }
  });
  