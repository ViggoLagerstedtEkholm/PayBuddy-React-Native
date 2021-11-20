import React, {useEffect, useState} from "react";

import {
    StyleSheet,
    View,
    SafeAreaView,
    Animated,
    TouchableOpacity,
} from "react-native";

import {VisibleItem} from '../VisibleItemsList/VisibleItem';
import { filterItems } from "./Helpers";

import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { DeleteOccasion, GetExpiredOccasions } from "../../SQL/DBHelper";

const ExpiredList = (props) => {
  const [expiredOccasions, setExpiredOccasions] = useState([]);

  useEffect(() => {
      GetExpiredOccasions().then((response) => {
        setExpiredOccasions(filterItems(response, props.searchPhrase));
      });
  }, [props.searchPhrase]);

  const closeRow = (rowMap, rowKey) =>{
    if(rowMap[rowKey]){
      rowMap[rowKey].closeRow();
    }  
  }

  const deleteRow = (rowMap, rowKey) =>{
    const newData = [... expiredOccasions];
    const prevIndex = expiredOccasions.findIndex(item => item.ID === rowKey);
    newData.splice(prevIndex, 1);
    setExpiredOccasions(newData);
    DeleteOccasion(rowKey);
  }

  const renderItem = (data, rowMap) =>{
    return (
      <VisibleItem data={data}/>
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
              <AntDesign name="close" size={24} color="black" style={styles.trash}/>
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
        onClose={() => closeRow(rowMap, data.item.ID)}
        onDelete={() => deleteRow(rowMap, data.item.ID)}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
        <SwipeListView
            style={styles.swipeList}
            data={expiredOccasions}
            renderItem={renderItem}
            keyExtractor={(item) => item.ID}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-150}
            disableRightSwipe
            leftActivationValue={100}
            rightActivationValue={-200}
            leftActionValue={0}
            stopRightSwipe={-150}
      /> 
    </SafeAreaView>
  );
};

export default ExpiredList;

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
