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
import { DeleteOccasion, GetHistoryOccasions, MakeHistoryToPending } from "../../SQL/DBHelper";

const HistoryList = (props) => {
  const [historyOccasions, setHistoryOccasions] = useState([]);

  useEffect(() => {
      GetHistoryOccasions().then((response) => {
        setHistoryOccasions(filterItems(response, props.searchPhrase));
      });
  }, [props.searchPhrase]);

  const closeRow = (rowKey) =>{
    deleteRowFromList(rowKey);
    MakeHistoryToPending(rowKey);
  }

  const deleteRow = (rowKey) =>{
    deleteRowFromList(rowKey);
    DeleteOccasion(rowKey);
  }

  const deleteRowFromList = (rowKey) =>{
    const newData = [... historyOccasions];
    const prevIndex = historyOccasions.findIndex(item => item.ID === rowKey);
    newData.splice(prevIndex, 1);
    setHistoryOccasions(newData);
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
            style={styles.backLeftBtn} 
            onPress={onClose}>
            <View style={styles.backPending}>
              <MaterialIcons name="pending-actions" size={28} color={"black"}/>        
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
        onClose={() => closeRow(data.item.ID)}
        onDelete={() => deleteRow(data.item.ID)}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
        <SwipeListView
            style={styles.swipeList}
            data={historyOccasions}
            renderItem={renderItem}
            keyExtractor={(item) => item.ID}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-150}
            leftOpenValue={90}
            stopLeftSwipe={90}
            stopRightSwipe={-150}
      />
    </SafeAreaView>
  );
};

export default HistoryList;

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
  backLeftBtn: {
    alignItems: 'flex-start',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: "#217ceb",
    top: 0,
    width: 90,
    paddingRight: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 200,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#008c31',
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
    marginRight: 50,
  },
  backPending:{
    height: 25,
    width: 25,
    marginLeft: 25,
  }
});
