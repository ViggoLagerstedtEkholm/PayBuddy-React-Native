import React, { useState } from 'react';

import { 
    View,
    StyleSheet
} from 'react-native';

import LocationScreen from './LocationScreen';
import PeopleScreen from './PeopleScreen';
import ItemScreen from './ItemScreen';
import OverviewScreen from './OverviewScreen';
import TitleScreen from './TitleScreen';
import DateScreen from './DateScreen';
import Pagination from './Pagination';
import TopPaginationInfo from './TopPaginationInfo';

export default function MultiPageForm ({ navigation, route }) {
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState();
    const [items, setItems] = useState([{title: "title1", cost: 13, quantity: 12}, {title: "title2", cost: 13, quantity: 12}]);
    const [people, setPeople] = useState([]);
    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState();

    const totalSteps = 6;

    const publish = () =>{
        //Save to db...
    }

    const nextStep = () =>{
        setStep(step + 1);
    }

    const previousStep = () =>{
        setStep(step - 1);
    }

    switch(step){
        case 1:
            return( 
                <View style={styles.container}>
                    <TopPaginationInfo step={step} totalSteps={totalSteps}/>
                    <TitleScreen 
                    onChange={(value) => setTitle(value)} 
                    title={title}/>

                    <Pagination nextStep={nextStep} />
                </View>
             )
        case 2:
            return( 
                <View style={styles.container}>
                    <TopPaginationInfo step={step} totalSteps={totalSteps}/>

                    <DateScreen 
                        onChange={(value) => setDate(value)} 
                        date={date}/>

                    <Pagination nextStep={nextStep} previousStep={previousStep}/>
                </View>
           )
        case 3:
            return( 
                <View style={styles.container}>
                    <TopPaginationInfo step={step} totalSteps={totalSteps}/>

                    <ItemScreen 
                    addItem={(item) => setItems([...items, item])}
                    removeItem={(items) => setItems(items)}
                    navigation={navigation} 
                    route={route}
                    items={items}/>
                    <Pagination nextStep={nextStep} previousStep={previousStep}/>
                </View>
             )
        case 4:
            return(
                <View style={styles.container}>
                    <TopPaginationInfo step={step} totalSteps={totalSteps}/>

                    <PeopleScreen 
                    onChange={(value) => setPeople(value)}
                    people={people}/>

                    <Pagination nextStep={nextStep} previousStep={previousStep}/>
                </View>
                 )
        case 5:
            return( 
                <View style={styles.container}>
                    <TopPaginationInfo step={step} totalSteps={totalSteps}/>

                    <LocationScreen 
                    onChange={(value) => setLocation(...value)} 
                    location={location}/>

                    <Pagination nextStep={nextStep} previousStep={previousStep}/>
                </View>
             )
        case 6:
            return( 
                <View style={styles.container}>
                    <TopPaginationInfo step={step} totalSteps={totalSteps}/>

                    <OverviewScreen 
                    onChange={() => publish()}
                    data={{title: title, items : items, people : people, location : location, date: date}}/>
                <Pagination previousStep={previousStep}/>
            </View>
            )
        default:
            return null
    }
}


const styles = StyleSheet.create({
    container : {
        backgroundColor: "black"
    }
});