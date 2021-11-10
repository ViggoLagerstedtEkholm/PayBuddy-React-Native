import React from 'react';
import { 
  StyleSheet, 
  SafeAreaView,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default function Map() {
  return (
    <SafeAreaView>
        <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={
        {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035
        }
        }/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    map: {
        height: "100%"
    }
});
