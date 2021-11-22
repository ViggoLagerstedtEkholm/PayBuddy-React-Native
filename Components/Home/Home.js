import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View,
  ScrollView,
  Text,
  Settings
} from 'react-native';
import { GetAmountExpired, GetAmountHistory, GetAmountPending, GetTotalCost, GetTotalExpiredCost, GetTotalHistoryCost, GetTotalPendingCost } from '../SQL/DBHelper';

import Statistic from './Statistic';

export default function Home() {
  const [totalCost, setTotalCost] = useState(0);
  const [totalPendingCost, setTotalPendingCost] = useState(0);
  const [totalHistoryCost, setTotalHistoryCost] = useState(0);
  const [totalExpiredCost, setTotalExpiredCost] = useState(0);
  const [totalAmountPending, setTotalAmountPending] = useState(0);
  const [totalAmountHistory, setTotalAmountHistory] = useState(0);
  const [totalAmountExpired, setTotalAmountExpired] = useState(0);

  useEffect(() =>{
    GetTotalCost().then(response =>{
      setTotalCost(response.TOTAL_COST);
    }).catch(error =>{
      console.log(error);
    });

    GetTotalPendingCost().then(response =>{
      setTotalPendingCost(response.TOTAL_COST);
    }).catch(error =>{
      console.log(error);
    });

    GetTotalHistoryCost().then(response =>{
      setTotalHistoryCost(response.TOTAL_COST);
    }).catch(error =>{
      console.log(error);
    });

    GetTotalExpiredCost().then(response =>{
      setTotalExpiredCost(response.TOTAL_COST);
    }).catch(error =>{
      console.log(error);
    });

    GetAmountPending().then(response =>{
      setTotalAmountPending(response.AMOUNT);
    }).catch(error =>{
      console.log(error);
    });

    GetAmountHistory().then(response =>{
      setTotalAmountHistory(response.AMOUNT);
    }).catch(error =>{
      console.log(error);
    });

    GetAmountExpired().then(response =>{
      setTotalAmountExpired(response.AMOUNT);
    }).catch(error =>{
      console.log(error);
    });
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.currency}>Currency : <Text style={styles.value}>{Settings.get('currency')}</Text></Text>
       <ScrollView>
            <Statistic name="Total cost of all occasions" value={totalCost} format={true}/>
            <Statistic name="Total cost of pending occasions" value={totalPendingCost} format={true}/> 
            <Statistic name="Total cost of history occasions" value={totalHistoryCost} format={true}/>
            <Statistic name="Total cost of expired occasions" value={totalExpiredCost} format={true}/>     
            <Statistic name="Total amount pending occasions" value={totalAmountPending} format={false}/> 
            <Statistic name="Total amount history occasions" value={totalAmountHistory} format={false}/>
            <Statistic name="Total amount expired occasions" value={totalAmountExpired} format={false}/>    
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 20
  },
  currency:{
    fontSize: 25,
    color : "white",
    textAlign: "center",
    marginBottom: 10
  },
  value:{
    color: "#c6a1e7"
  }
});
