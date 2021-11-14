import React, { useState, useMemo, useContext } from 'react';

import LocationScreen from '../Screens/LocationScreen';
import PeopleScreen from '../Screens/PeopleScreen';
import ItemScreen from '../Screens/ItemScreen';
import OverviewScreen from '../Screens/OverviewScreen';
import TitleScreen from '../Screens/TitleScreen';
import DateScreen from '../Screens/DateScreen';

import Screen from './Screen';
import { PeopleContext } from '../../../Context/PeopleContext';

export default function MultiPageForm ({ navigation, route }) {
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState();
    const [items, setItems] = useState([{title: "title1", cost: 13, quantity: 12}, {title: "title2", cost: 13, quantity: 12}]);
    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState();
    const {people, setPeople} = useContext(PeopleContext);

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
                <Screen 
                totalSteps={totalSteps}
                step={step}
                nextStep={nextStep}
                screen={<TitleScreen 
                onChange={(value) => setTitle(value)} 
                title={title}/>}/>)
        case 2:
            return( 
                <Screen 
                totalSteps={totalSteps}
                step={step}                
                nextStep={nextStep}
                previousStep={previousStep}
                screen={<DateScreen 
                onChange={(value) => setDate(value)} 
                date={date}/>}/>)
        case 3:
            return(
                <Screen
                totalSteps={totalSteps} 
                step={step}  
                nextStep={nextStep}
                previousStep={previousStep}
                screen={<PeopleScreen 
                addItem={(person) => setPeople([...people, person])}
                removeItem={(items) => setPeople(items)}
                navigation={navigation}
                setItems={setPeople} 
                route={route}
                onChange={(value) => setPeople(value)}
                people={people}/>}/>)
        case 4:
            return( 
                <Screen 
                totalSteps={totalSteps}
                step={step}  
                nextStep={nextStep}
                previousStep={previousStep}
                screen={<ItemScreen 
                addItem={(item) => setItems([...items, item])}
                removeItem={(items) => setItems(items)}
                navigation={navigation} 
                setItems={setItems}
                route={route}
                items={items}
                />}/>
                )

        case 5:
            return( 
                <Screen 
                totalSteps={totalSteps}
                step={step}  
                nextStep={nextStep}
                previousStep={previousStep}
                screen={<LocationScreen 
                onChange={(value) => setLocation(...value)} 
                location={location}/>}/>
             )
        case 6:
            return( 
                <Screen 
                totalSteps={totalSteps}
                step={step}  
                previousStep={previousStep}
                screen={<OverviewScreen 
                onChange={() => publish()}
                data={{title: title, items : items, people : people, location : location, date: date}}/>}/>)
        default:
            return null
    }
}