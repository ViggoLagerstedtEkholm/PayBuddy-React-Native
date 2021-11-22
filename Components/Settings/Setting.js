import React, { useEffect, useState } from "react";
import { Settings, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {Picker} from '@react-native-picker/picker';

const cc = require('currency-codes');

export default function Setting() {
  const [activeSelectedCurrency, setActiveSelectedCurrency] = useState(Settings.get("currency"));
  const [activeCurrency, setActiveCurrency] = useState(Settings.get("currency"));

  const storeCurrency = () => {
    if(activeSelectedCurrency != null){
      const data = { currency: activeSelectedCurrency};
      Settings.set(data);
      setActiveCurrency(Settings.get("currency"));
    }
  };

  const FillDropDownListWithCodes = () =>{
    return cc.codes().map(function (data, index) {
      return(
        <Picker.Item key={index} label={data} value={data} color="white"/>
      )
    })
  }

  return (
    <View style={styles.container}>

    <View style={styles.currentBox}>
      <Text style={styles.current}>{activeCurrency ?? "No currency selected" }</Text>
    </View>

      <View style={{flex: 1, marginTop: 25, alignContent: "center", alignItems: "center"}}>
        <Text style={styles.text}>Select currency</Text>
        <Picker
          selectedValue={activeSelectedCurrency} style={styles.picker} onValueChange={(itemValue, itemIndex) => setActiveSelectedCurrency(itemValue)}>
          {FillDropDownListWithCodes()}
        </Picker>
      </View>

      <Text style={[styles.selected, {marginTop: 25}]}>{activeSelectedCurrency}</Text>

      <View style={{flex: 1, marginBottom: 25, padding: 25}}>
        <TouchableOpacity
              style={styles.button}
              onPress={() => storeCurrency()}>
                  <Text style={styles.buttonText}>Select</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212"
  },
  button: {    
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    width: "100%",
    backgroundColor: 'white',
  },
  currentBox:{
    marginTop: 25,
    padding: 5
  },
  selected:{
    fontSize: 35,
    color: "#c6a1e7",
    textAlign: "center"
  },
  current:{
    fontSize: 45,
    color: "white",
    textAlign: "center"
  },
  buttonText:{
    color: "black"
  },
  text:{
    fontSize: 24,
    color: "white"
  },
  picker:{
    height: 50, 
    width: "100%" 
  }
});
