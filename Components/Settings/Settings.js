import React from 'react';
import { 
  StyleSheet, 
  Text,
  SafeAreaView,
  Button
} from 'react-native';

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
        <Text>Settings</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
