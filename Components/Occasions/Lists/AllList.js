import React, {useEffect, useState} from "react";

import {
    SafeAreaView,
    Animated,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import {VisibleItemWithActions} from '../VisibleItemsList/VisibleItem';
import { SwipeListView } from 'react-native-swipe-list-view';
import { AntDesign } from '@expo/vector-icons'; 
import { filterItems } from "./Helpers";
import { GetAllOccasions, MakeOccasionExpired } from "../../SQL/DBHelper";
import OccasionInspect from "../Inspect/OccasionInspect";

const AllList = (props) => {
  const [allOccasions, setAllOccasions] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [inspectID, setInspectID] = useState(null);

  useEffect(() => {
      GetAllOccasions().then((response) => {
        setAllOccasions(filterItems(response, props.searchPhrase));
      });
  }, [props.searchPhrase]); 

  function deleteRowFromList(rowKey){
    MakeOccasionExpired(rowKey);
    const newData = [... allOccasions];
    const prevIndex = allOccasions.findIndex(item => item.ID === rowKey);
    newData.splice(prevIndex, 1);
    setAllOccasions(newData);
  }

  const onClicked = (rowKey) =>{
    setInspectID(rowKey);
    setModalIsVisible(true);
    console.log(rowKey);
  }

  const HiddenItemWithActions = props =>{
    const {
      swipeAnimatedValue, 
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onDelete
    } = props;

    return(
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
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
                <AntDesign name="warning" size={24} color={"#FAFAFA"}/>            
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
        onDelete={() => deleteRowFromList(data.item.ID)}
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
            data={allOccasions}
            renderItem={renderVisibleItem}
            keyExtractor={(item) => item.ID}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-75}
            disableRightSwipe
            leftActivationValue={100}
            rightActivationValue={-200}
            leftActionValue={0}
            stopRightSwipe={-75}
      />
    </SafeAreaView>
  );
};

export default AllList;

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
    backgroundColor: '#2e82b0',
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
    backgroundColor: '#DDD',
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
    backgroundColor: '#1f65ff',
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
});
