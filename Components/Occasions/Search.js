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
  const [filterOption, setFilterOption] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);

 return (
    <SafeAreaView style={styles.root}>
      {!clicked && <Text style={styles.title}>Occasions</Text>}
        <Text>{filterOption}</Text>
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
    fontSize: 25,
    color: "#c6a1e7",
    fontWeight: "bold",
    marginLeft: "10%",
  },
});