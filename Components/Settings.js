import React from 'react';
import { 
  StyleSheet, 
  Text,
  SafeAreaView,
  Button
} from 'react-native';

export default function Settings({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
        <Text>Settings</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
