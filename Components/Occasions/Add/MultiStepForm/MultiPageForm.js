import React, { useState} from 'react';

import LocationScreen from '../Screens/LocationScreen';
import PeopleScreen from '../Screens/PeopleScreen';
import ItemScreen from '../Screens/ItemScreen';
import OverviewScreen from '../Screens/OverviewScreen';
import TitleScreen from '../Screens/TitleScreen';
import DateScreen from '../Screens/DateScreen';

import Screen from './Screen';

export default function MultiPageForm ({ navigation}) {
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState(null);

    const totalSteps = 6;

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
                screen={<PeopleScreen navigation={navigation}/>}/>)
        case 4:
            return( 
                <Screen 
                totalSteps={totalSteps}
                step={step}  
                nextStep={nextStep}
                previousStep={previousStep}
                screen={<ItemScreen navigation={navigation}/>}/>
                )

        case 5:
            return( 
                <Screen 
                totalSteps={totalSteps}
                step={step}  
                nextStep={nextStep}
                previousStep={previousStep}
                screen={<LocationScreen 
                setLocation={(value) => setLocation(value)} 
                location={location}/>}/>
             )
        case 6:
            if(!(location) || title === ""){
                setStep(step - 1);
                alert('Fill in every step.');
                return; 
            }

            return( 
                <Screen 
                totalSteps={totalSteps}
                step={step}  
                previousStep={previousStep}
                screen={<OverviewScreen
                navigation={navigation} 
                data={{title: title, location : location, date: date}}/>}/>)
        default:
            return null
    }
}