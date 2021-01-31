import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Timer from "./src/component/timer"
import PreciseTimer from "./src/component/preciseTimer"
import Clock from "./src/component/clock"

export default function App() {

  const countUp = () =>{

  }

  

  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <Timer />
      <Timer type="ms"/>
      <PreciseTimer />
      <Clock />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
