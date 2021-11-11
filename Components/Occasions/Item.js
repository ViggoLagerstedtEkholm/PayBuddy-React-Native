import React from 'react';
import { 
  StyleSheet, 
  SafeAreaView,
  Text,
  View
} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

export default function Item({ title, value, status }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
        {
          status === 2 ? <MaterialIcons name="pending-actions" size={30} color={"#FAFAFA"} />        
          : status === 3 ? <FontAwesome name="history" size={30} color={"#FAFAFA"} />
          : status === 4 ? <AntDesign name="warning" size={30} color={"#FAFAFA"}/>      
          : null
        }
      </View>
      <Text style={styles.value}>{value}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#3a2d49',
      paddingStart: 20,
      paddingEnd: 20,
      paddingVertical: 20,
      marginVertical: 4,
      marginStart: 10,
      marginEnd: 10,
      height: 200,
      borderRadius: 10,
    },
  
    title: {
      fontSize: 25,
      color: "#c6a1e7"
    },

    topRow:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
  
    value: {
        fontSize: 20,
        color: "#b2adb8"
    }
  });
  