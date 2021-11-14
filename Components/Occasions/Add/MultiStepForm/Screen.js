import React from 'react';

import {
  StyleSheet,
  View,
} from "react-native";

import Pagination from './Pagination';
import TopPaginationInfo from './TopPaginationInfo';

export default function Screen (props) {
    const {nextStep, previousStep, totalSteps, step, screen} = props;
  return (
    <View style={styles.container}>
        <TopPaginationInfo step={step} totalSteps={totalSteps}/>

        {screen}

        {previousStep && nextStep ? <Pagination nextStep={nextStep} previousStep={previousStep}/> : 
        previousStep ? <Pagination previousStep={previousStep}/> : 
        nextStep ? <Pagination nextStep={nextStep}/> : null}
    </View>
  );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: "black"
    }
});