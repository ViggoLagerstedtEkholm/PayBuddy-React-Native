import React, {useEffect, useState} from "react";

import {
    View,
    SafeAreaView,
    Animated,
    TouchableOpacity,
    StyleSheet,
    TouchableHighlight,
    Text,
    Modal
} from "react-native";

import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { DeleteOccasion, GetItemsByID, GetItemsFromOccasion, GetLocationByID } from "../../SQL/DBHelper";
import LocationOnMap from "./LocationOnMap";

const OccasionInspect = (props) => {
  const [items, setItems] = useState([]);
  const [location, setLocation] = useState(null);
  const [visibleMap, setVisibleMap] = useState(false);
  const {setModalIsVisible, modalIsVisible, inspectID} = props;

  useEffect(() => {
    GetItemsByID(inspectID).then((response) =>{
        setItems(response);
    }).catch((error)=>{
        console.log(error);
    });

    GetLocationByID(inspectID).then((response) => {
        setLocation(response);
        console.log("Location : " , response);
    }).catch(error =>{
        console.log(error);
    });
  },[inspectID])

  const edit = (rowKey) =>{
    console.log("ID: " , rowKey);
  }

  const deleteRow = (rowKey) =>{
    deleteRowFromList(rowKey);
    DeleteOccasion(rowKey);
  }

  const onClicked = (rowKey) =>{
    setInspectID(rowKey);
    setModalIsVisible(true);
  }

  const deleteRowFromList = (rowKey) =>{
    const newData = [... items];
    const prevIndex = items.findIndex(item => item.ID === rowKey);
    newData.splice(prevIndex, 1);
    setItems(newData);
  }

  const VisibleItemWithActions = props =>{
    const {
      data
    } = props;

    console.log(data);

    const item = data.item;
  
    return (
      <TouchableHighlight style={styles.rowFrontVisible}>
          <View>
            <Text style={styles.title} numberOfLines={1}>{item.Title}</Text>
            <Text style={styles.details} numberOfLines={1}>Cost: {item.Cost}</Text>
            <Text style={styles.details} numberOfLines={1}>Quantity : {item.Quantity}</Text>

            <Text style={styles.details} numberOfLines={1}>Person : {item.Firstname} {item.Lastname}</Text>
            <Text style={styles.details} numberOfLines={1}>Phone number : {item.PhoneNumber}</Text>
          </View>
      </TouchableHighlight>
    )
  }

  const HiddenItemWithActions = props =>{
    const {
      swipeAnimatedValue, 
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose, 
      onDelete
    } = props;
    return(
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
          <TouchableOpacity 
            style={[styles.backRightBtn, styles.backRightBtnLeft]} 
            onPress={onClose}>
            <View style={styles.trash}>
              <FontAwesome name="history" size={25} color="black" />
            </View>
          </TouchableOpacity>
          <Animated.View style={[styles.backRightBtn, styles.backRightBtnRight, {flex: 1, width: rowActionAnimatedValue}]}>
            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete}>
              <Animated.View style={[styles.trash, {
                              transform: [
                                {
                                  scale : swipeAnimatedValue.interpolate({
                                    inputRange: [-90, -45],
                                    outputRange: [1, 0],
                                    extrapolate: 'clamp'
                                  }),
                                },
                              ],
                            }]}>
                <MaterialIcons name="delete-outline" size={30} color="black"/>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
      </Animated.View>
    );
  }

  const renderHiddenItem = (data, rowMap) =>{
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => edit(data.item.ID)}
        onDelete={() => deleteRow(data.item.ID)}
      />
    )
  }

  const renderVisibleItem = (data, rowMap) =>{
    return (
      <VisibleItemWithActions
        data={data}
        onClick={() => onClicked(data.item.ID)}
      />
    )
  }

  return (
      <Modal visible={modalIsVisible}>

        <SafeAreaView style={texts.container}>
            <Text style={texts.title}>Occasion info</Text>
        </SafeAreaView>

        <View style={styles.container}>
            <SwipeListView
                style={styles.swipeList}
                data={items}
                renderItem={renderVisibleItem}
                keyExtractor={(item) => item.ID}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-150}
                disableRightSwipe
                stopRightSwipe={-150}/>
        </View>
        
        <View style={buttons.container}>
            <View style={map.container}>            
                <LocationOnMap 
                latitude={52} 
                longitude={55} 
                visibleMap={visibleMap} 
                setVisibleMap={setVisibleMap}/>
            </View>

            <TouchableOpacity style={buttons.button} onPress={() => setVisibleMap(true)}>
                <Text style={buttons.text}>See location on maps</Text>
            </TouchableOpacity>

            <TouchableOpacity style={buttons.button} onPress={() => setModalIsVisible(false)}>
                <Text style={buttons.text}>Close</Text>
            </TouchableOpacity>

        </View>
      </Modal>
  );
};

export default OccasionInspect;

const texts = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#121212",
    },
    title:{
        fontSize: 25,
        padding: 25,
        backgroundColor: "#121212",
        color: "#c6a1e7"
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

const map = StyleSheet.create({
    container: {
        padding: 20
    }
});

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#121212',
    paddingStart: 10,
    paddingEnd: 10,
  },
  swipeList:{
    backgroundColor: '#121212',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#2d6cba',
    borderRadius: 5,
    height: 60,
    margin: 10,
    marginBottom: 20,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: 'green',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  }
  ,
  rowFrontVisible: {
    backgroundColor: "#3a2d49",
    borderRadius: 5,
    height: 150,
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#c6a1e7',
  },
  details: {
    fontSize: 14,
    color: '#999',
  },
  status:{
    fontSize: 25,
    marginTop: "5%",
    alignSelf: "center",
    color: '#999',
  }
});
