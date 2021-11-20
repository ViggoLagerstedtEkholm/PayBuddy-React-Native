import React, {useState, useEffect, useContext} from 'react';
import { 
    View, 
    StyleSheet,
    Text
} from 'react-native';

import * as Location from 'expo-location';

export default function LocationScreen (props) {
    const {setLocation, location} = props;
    const [errorMsg, setErrorMsg] = useState(null);  

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
  },  
  paragraph: {
    color: "white",
    fontSize: 18,
    textAlign: 'center',
  },
});