import React, { useEffect, useState } from "react";
import { Settings, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export const ConvertFromBaseCurrency = (Item) =>{
    const ToCurrency = Settings.get('currency');
    const FromCurrency = Item.BaseCurrency;
}