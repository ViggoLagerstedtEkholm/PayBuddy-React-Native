import React, {useEffect} from 'react';

import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Text
} from "react-native";

import { PeopleItem } from '../../VisibleItemsList/PeopleItem';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

export default function PeopleScreen (props) {
  const {addItem, removeItem, people, navigation, route, setItems} = props;

  useEffect(() => {
    setItems(people.map((person, index) => ({ ...person, key : index})));
    if (route.params?.person) {
      addItem(route.params?.person);
    }
  }, [route.params?.person]);

  const closeRow = (rowMap, rowKey) =>{
    if(rowMap[rowKey]){
      rowMap[rowKey].closeRow();
    }
  }

  const deleteRow = (rowMap, rowKey) =>{
    closeRow(rowMap, rowKey);
    const newData = [... people];
    const prevIndex = people.findIndex(person => person.key === rowKey);
    newData.splice(prevIndex, 1);
    removeItem(newData);
  }

  const renderItem = (data, rowMap) =>{
    return (
      <PeopleItem data={data}/>
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
      <Animated.View style={[listStyle.rowBack, {height: rowHeightAnimatedValue}]}>
            <TouchableOpacity 
            style={[listStyle.backRightBtn, listStyle.backRightBtnLeft]} 
            onPress={onClose}>
            <View style={listStyle.trash}>
              <AntDesign name="close" size={24} color="black" style={listStyle.trash}/>
            </View>
          </TouchableOpacity>
          <Animated.View style={[listStyle.backRightBtn, listStyle.backRightBtnRight, {flex: 1, width: rowActionAnimatedValue}]}>
            <TouchableOpacity style={[listStyle.backRightBtn, listStyle.backRightBtnRight]} onPress={onDelete}>
              <Animated.View style={[listStyle.trash, {
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
    <View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Add Person')}>
              <Text style={styles.buttonText}>Add Person</Text>
        </TouchableOpacity>
      </View>
      
      <View style={listStyle.container}>
        <SwipeListView
              style={listStyle.swipeList}
              data={people}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              keyExtractor={(item, index) => index.toString()}
              rightOpenValue={-75}
              disableRightSwipe
              leftActivationValue={100}
              rightActivationValue={-200}
              leftActionValue={0}
              rightActionValue={-500}
              stopRightSwipe={-80}
        />
      </View>
    </View>
  );
}


const listStyle = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    width: "100%",
    height: "64%",
    marginTop: "20%",
    marginBottom: "20%",
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

const styles = StyleSheet.create({
  container: {
    flex: 4,
    height: "100%",
    justifyContent: "center",
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
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  buttonContainer : {
    width: "100%",
    display: "flex",
    marginTop: 25,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10
}
});