import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

export default function Map() {
    const coordinates = 
    [
        { latitude: 37.8025259, longitude: -122.4351431 },
        { latitude: 55.8025259, longitude: -66.4351431 },
        { latitude: 367.8025259, longitude: -77.4351431 },
        { latitude: 65.8025259, longitude: -88.4351431 },
        { latitude: 74.8025259, longitude: -99.4351431 },
        { latitude: 727.8025259, longitude: -99.4351431 },
        { latitude: 317.8025259, longitude: -122.4351431 },
        { latitude: 357.8025259, longitude: -122.4351431 }
    ];

    const showMarkers = () =>{
        return coordinates.map(function (data, i){
            console.log(data.latitude);
            return(
                <Marker key={i} coordinate={data} title={'Some random data'}>
                    <Callout>
                        <Text>Test</Text>
                    </Callout>
                </Marker>
            )
        });
    }

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
                    }}>

                {showMarkers()}
            </MapView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    map: {
        height: "100%"
    }
});
