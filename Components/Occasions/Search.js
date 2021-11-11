import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  SafeAreaView,
  Text
} from 'react-native';

import List from "./List";
import Filtering from "./Filtering";
import Floating from "./Floating";
import Options from './Options';

export default function Search() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [filterOption, setFilterOption] = useState(2);
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  useEffect(() => {
    setFakeData([
      {title: "Title1", value: "Value1", status: 2},
      {title: "Title2", value: "Value2", status: 3},
      {title: "Title3", value: "Value3", status: 3},
      {title: "Title4", value: "Value4", status: 3},
      {title: "Title5", value: "Value5", status: 4},
      {title: "Title6", value: "Value6", status: 4},
      {title: "Title7", value: "Value7", status: 2},
  ])
    
  }, []);

 return (
    <SafeAreaView style={styles.root}>
      {!clicked && <Text style={styles.title}>Occasions</Text>}
        <Filtering
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
          />

          <Options 
            setFilterOption={setFilterOption}
            filterOption={filterOption}
          />

        <List
          searchPhrase={searchPhrase}
          data={fakeData}
          filterOption={filterOption}
          setClicked={setClicked}
        />

        <Floating/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212"
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 18,
    color: "#c6a1e7",
    textAlign: "center",
    fontWeight: "bold",
  },
});