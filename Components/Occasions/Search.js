import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  SafeAreaView,
  Text,
  View
} from 'react-native';

import AllList from "./Lists/AllList";
import PendingList from "./Lists/PendingList";
import HistoryList from "./Lists/HistoryList";
import ExpiredList from "./Lists/ExpiredList";

import Filtering from "./Filtering";
import Floating from "./Floating";
import Options from './Options';

export default function Search({ navigation }) {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [filterOption, setFilterOption] = useState(2);
  const [clicked, setClicked] = useState(false);

  function filterOptionSelected(){
    switch(filterOption){
      case 1:
        return(
          <AllList
            searchPhrase={searchPhrase}
            navigation={navigation}
          />
        );
      case 2:
        return(
          <PendingList
            searchPhrase={searchPhrase}
            navigation={navigation}
          />
        );
      case 3:
        return (
          <HistoryList
            searchPhrase={searchPhrase}
            navigation={navigation}
          />
        )
      case 4:
        return(
          <ExpiredList
            searchPhrase={searchPhrase}
            navigation={navigation}
          />
        )
      default:
    }
  }

 return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'powderblue' }}>
        <View style={{ flex: 1, backgroundColor: '#121212' }}> 
          <Filtering
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
            />
        </View>

        <View style={{ flex: 1.1, backgroundColor: '#121212' }}> 
          <Options 
              setFilterOption={setFilterOption}
              filterOption={filterOption}
            />
        </View>

        <View style={{ flex: 7, backgroundColor: '#121212' }}> 
          {filterOptionSelected()}
        </View>

      <Floating onNavigate={() => navigation.navigate('MultiPageForm')}/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#121212",
  },
  title: {
    flex: 1,
    width: "100%",
    marginTop: 20,
    fontSize: 18,
    color: "#c6a1e7",
    textAlign: "center",
    fontWeight: "bold",
  }
});