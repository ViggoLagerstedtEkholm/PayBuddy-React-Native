import React from 'react';
import { 
  StyleSheet, 
  SafeAreaView,
  Text, 
  Pressable
} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 

export default function Floating() {
    return (
        <Pressable style={styles.button} onPress={() => alert('Pressed.')}>
          <Entypo style={styles.icon} name="add-to-list" size={24} color="black" />
        </Pressable>
    );
  }  

const styles = StyleSheet.create({
  button: {
    width: 60,  
    height: 60,   
    borderRadius: 30,            
    backgroundColor: '#c6a1e7',                                    
    position: 'absolute',                                          
    bottom: 20,                                                    
    right: 20
  },
  icon: {
    left: "30%",
    top: "35%",
    fontSize: 25,
    lineHeight: 21,
    fontWeight: 'bold',
    color: 'white',
  },
});
