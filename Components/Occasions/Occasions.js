import React from 'react';
import { 
  StyleSheet, 
  SafeAreaView,
  Text, 
  Pressable
} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 

export default function Occasions() {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.button} onPress={() => alert('Pressed.')}>
        <Entypo style={styles.icon} name="add-to-list" size={24} color="black" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 60,  
    height: 60,   
    borderRadius: 30,            
    backgroundColor: '#3a2d49',                                    
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: 10
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
