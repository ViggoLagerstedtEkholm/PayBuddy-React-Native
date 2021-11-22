import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import OccasionInspect from '../Occasions/Inspect/OccasionInspect';
import { GetAllLocations } from '../SQL/DBHelper';

export default function Map() {
    const [locations, setLocations] = useState([]);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [inspectID, setInspectID] = useState(null);

    useEffect(() =>{
        GetAllLocations().then(response =>{
            console.log(response);
            setLocations(response);
        }).catch(error =>{
            console.log(error);
        });
    }, []);  

    function showInfo (ID){
        setInspectID(ID);
        setModalIsVisible(true);
    }

    const showMarkers = () =>{
        return locations.map(function (data, i){
            if(data.IsPaid === 1){
                return(
                    <Marker 
                    key={i} 
                    coordinate={{latitude : data.Latitude, longitude : data.Longitude}} 
                    title={data.Title}
                    onPress={() => showInfo(data.OccasionID)}>
                        <Image
                            source={require('../../assets/History.png')}
                            style={{width: 26, height: 28}}
                            resizeMode="contain"/>
                    </Marker>
                )
            }
            else if(data.IsPaid === 0 && data.IsExpired === 0){
                return(
                    <Marker 
                    key={i} 
                    coordinate={{latitude : data.Latitude, longitude : data.Longitude}} 
                    title={data.Title}
                    onPress={() => showInfo(data.OccasionID)}>
                        <Image
                            source={require('../../assets/Pending.png')}
                            style={{width: 26, height: 28}}
                            resizeMode="contain"/>
                    </Marker>
                )
            }
            else if(data.IsExpired === 1){
                return(
                    <Marker 
                    key={i} 
                    coordinate={{latitude : data.Latitude, longitude : data.Longitude}} 
                    title={data.Title}
                    onPress={() => showInfo(data.OccasionID)}>
                           <Image
                            source={require('../../assets/Expired.png')}
                            style={{width: 26, height: 28}}
                            resizeMode="contain"
                            />
                    </Marker>
                )
            }
        });
    }

    return (
        <SafeAreaView>
            <OccasionInspect setModalIsVisible={setModalIsVisible} modalIsVisible={modalIsVisible} inspectID={inspectID}/>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={
                    {
                        latitude: 59.21284963350048,
                        longitude: 18.363956988396133,
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
