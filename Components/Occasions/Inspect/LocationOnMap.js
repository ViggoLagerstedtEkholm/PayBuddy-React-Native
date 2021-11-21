import React from 'react';
import {
    StyleSheet,
    Modal,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

export default function LocationOnMap(props) {
    const {latitude, longitude, visibleMap, setVisibleMap} = props;

    const showMarker = () =>{
        return(
            <Marker 
            coordinate={{latitude : latitude, longitude : longitude}} 
            title="Occasion location"
            description="This is a marker!">
               
            
            </Marker>
        )
    }

    return (
        <Modal visible={visibleMap}>
            <View style={{ flex: 10, backgroundColor: '#121212' }}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={
                        {
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.09,
                            longitudeDelta: 0.035
                        }}>

                    {showMarker()}
                </MapView>
            </View>
          
            <View style={{ flex: 1, backgroundColor: '#121212', padding: 10, borderTopEndRadius: 10, borderTopStartRadius: 10 }}>
                <TouchableOpacity style={buttons.button} onPress={() => setVisibleMap(false)}>
                    <Text style={buttons.text}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const callout = StyleSheet.create({
    container:{
        backgroundColor: "#121212",
        height: "100%"
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black'
    }
});

const buttons = StyleSheet.create({
    container:{
        flex: 2,
        display: "flex",
        justifyContent: "space-evenly",
        backgroundColor: "#121212",
        padding: 20

    },
    button: {    
        marginLeft: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        width: "100%",
        backgroundColor: 'white',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    }
});

const styles = StyleSheet.create({
    map: {
        height: "100%"
    }
});
