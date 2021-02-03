import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Timer from "./src/component/timer"
import PreciseTimer from "./src/component/preciseTimer"
import Clock from "./src/component/clock"
import { Audio } from 'expo-av';

export default function App() {

  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('./src/sound/beep.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
     
      <Text>Hello World</Text>
      <Timer />
      <Timer type="ms"/>
      <PreciseTimer cd={false}/>
      <PreciseTimer type="tar" cd={false} sec={5}/>
      <PreciseTimer type="cd" cd={true} sec={5}/>

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
  },test:{
    backgroundColor: '#ff0000'
  }
});
