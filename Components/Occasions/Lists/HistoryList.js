import React, {useState, useEffect} from "react";

import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Animated,
    TouchableOpacity,
} from "react-native";

import {VisibleItem} from '../VisibleItem';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import styles from './Item.component.style';

const HistoryList = (props) => {
    useEffect(() => {
        props.setData(filterItems([
            {key: 1, title: "HistoryList 1", value: "ABC", status: 2},
            {key: 2, title: "HistoryLister 2", value: "ABC", status: 3},
            {key: 3, title: "HistoryList 3", value: "ABC", status: 3},
            {key: 4, title: "HistoryList 4", value: "ABC", status: 3},
            {key: 5, title: "HistoryList 5", value: "ABC", status: 4},
        ]));
    }, [props.searchPhrase]);

    function filterItems(unfilteredData){
        let filteredArray = [];
        console.log('called');
        for (let i = 0; i < unfilteredData.length; i++) {
            const item = unfilteredData[i];
            if (item.title.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
                filteredArray.push(item);
            }
            else if (item.value.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
                filteredArray.push(item);
            }
        }
        return filteredArray;
    }      

  const closeRow = (rowMap, rowKey) =>{
    if(rowMap[rowKey]){
      rowMap[rowKey].closeRow();
    }
  }

  const deleteRow = (rowMap, rowKey) =>{
    closeRow(rowMap, rowKey);
    const newData = [... listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  }

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const onLeftActionStatusChange = rowKey => {
    console.log('onLeftActionStatusChange', rowKey);
  };

  const onRightActionStatusChange = rowKey => {
    console.log('onRightActionStatusChange', rowKey);
  };

  const onRightAction = rowKey => {
    console.log('onRightAction', rowKey);
  };

  const onLeftAction = rowKey => {
    console.log('onLeftAction', rowKey);
  };

  const renderItem = (data, rowMap) =>{
    return (
      <VisibleItem data={data}/>
    )
  }

  const HiddenItemWithActions = props =>{
    const {
      swipeAnimatedValue, 
      rightActionActivated, 
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose, 
      onDelete
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false
      }).start();
    }

    return(
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
          <Text>Left</Text>
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
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
        <SwipeListView
            style={styles.swipeList}
            data={props.data}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-150}
            disableRightSwipe
            onRowDidOpen={onRowDidOpen}
            leftActivationValue={100}
            rightActivationValue={-200}
            leftActionValue={0}
            rightActionValue={-500}
            onLeftAction={onLeftAction}
            onRightAction={onRightAction}
            onLeftActionStatusChange={onLeftActionStatusChange}
            onRightActionStatusChange={onRightActionStatusChange}
      />
    </SafeAreaView>
  );
};

export default HistoryList;