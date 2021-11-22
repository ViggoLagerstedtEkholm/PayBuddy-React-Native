import React, {useEffect, useState} from "react";

import {
    View,
    SafeAreaView,
    Animated,
    TouchableOpacity,
    StyleSheet,
    TouchableHighlight,
    Text
} from "react-native";

//import {VisibleItem} from '../VisibleItemsList/VisibleItem';
import { filterItems } from "./Helpers";

import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { DeleteOccasion, GetActiveOccasions, MakeActiveToHistory } from "../../SQL/DBHelper";
import OccasionInspect from "../Inspect/OccasionInspect";
import { VisibleItemWithActions } from "../VisibleItemsList/VisibleItem";

const PendingList = (props) => {
  const [activeOccasions, setActiveOccasions] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [inspectID, setInspectID] = useState(null);

  useEffect(() => {
    //If the navigation focus changes that means we added a new occasion!
    props.navigation.addListener('focus', () => {
        GetActive();
    });

    GetActive();
  }, [props.searchPhrase]);

  const GetActive = () =>{
    GetActiveOccasions().then((response) => {
      setActiveOccasions(filterItems(response, props.searchPhrase));
    });
  }

  const makeHistory = (rowKey) =>{
    deleteRowFromList(rowKey);
    MakeActiveToHistory(rowKey);
  }

  const deleteRow = (rowKey) =>{
    deleteRowFromList(rowKey);
    DeleteOccasion(rowKey);
  }

  const onClicked = (rowKey) =>{
    setInspectID(rowKey);
    setModalIsVisible(true);
    console.log(rowKey);
  }

  const deleteRowFromList = (rowKey) =>{
    const newData = [... activeOccasions];
    const prevIndex = activeOccasions.findIndex(item => item.ID === rowKey);
    newData.splice(prevIndex, 1);
    setActiveOccasions(newData);
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
        onClose={() => makeHistory(data.item.ID)}
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
    <SafeAreaView style={styles.container}>
        <OccasionInspect setModalIsVisible={setModalIsVisible} modalIsVisible={modalIsVisible} inspectID={inspectID}/>

        <SwipeListView
            style={styles.swipeList}
            data={activeOccasions}
            renderItem={renderVisibleItem}
            keyExtractor={(item) => item.ID}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-150}
            disableRightSwipe
            stopRightSwipe={-150}/>
    </SafeAreaView>
  );
};

export default PendingList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    width: "100%",
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
