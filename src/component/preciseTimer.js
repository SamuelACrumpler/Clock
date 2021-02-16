import React, { useState } from "react";
import { Text, View, ToastAndroid, Platform} from "react-native";
import { Header, Button, Input, ButtonGroup} from 'react-native-elements';
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Audio } from 'expo-av';


const displayHMS = (dur) => {

    let ss = Math.floor((dur / 1000) % 60);
    let mm = Math.floor((dur / (1000 * 60)) % 60);
    let hh = Math.floor((dur / (1000 * 60 * 60)));

    hh = String(hh).padStart(2, '0');
    mm = String(mm).padStart(2, '0');
    ss = String(ss).padStart(2, '0');
    let tStr = hh + ":" + mm + ":" + ss;
    return tStr;

}



const PreciseTimer = (props) => {

// ---- States

const [seconds,setSeconds] = useState(0);
const [dest, setDest] = useState(0)
const [target, setTarget] = useState(0)
const [base, setBase] = useState(0)
const [color, setColor] = useState("#000")
const [cdBool, setCDBool] = useState(false)
const [timers, setTimers] = useState([])
const [tarBool, setTarBool] = useState(false)
const [sound, setSound] = React.useState();
const [alarm, setAlarm] = useState(false);


const [countInterval, setCountInterval] = useState(0);
const [started, setStarted] = useState(false);



async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../sound/beep.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); 
}

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);


const findTarget = () => {
    let hms = props.hours ? props.hours * 3600000 : 0;
    let mms = props.min ? props.min * 60000 : 0;
    let sms = props.sec ? props.sec * 1000 : 0;
    let tms = hms + mms + sms; //total milliseconds
    setTarget(tms)
}


const timerStyle = () => {
    return {color : color, fontWeight: "bold", fontSize: 20, textAlign: 'center', justifyContent: 'center'}
}

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@timers')
        setTimers(JSON.parse(jsonValue))
    } catch(e) {
    // error reading value
    console.log("Error while loading data: " + e)

    }
}

const storeData = async (value) => {
    if(timers !== null || timers !== undefined){
        value = timers
    }
    const jsonValue = JSON.stringify(value)
    try {
      await AsyncStorage.setItem('@timers', jsonValue)
      props.refresh()
    } catch (e) {
      // saving error
      console.log("Error while saving data: " + e)
    }
}

const deleteData = async () =>{
    let tTimers = timers;
    tTimers.splice(props.index, 1); //should delete via the index.
    storeData(tTimers)
}


// --- call back functions

    React.useEffect(() => {
        getData();
        
        
    }, [])
  


    React.useEffect(() => {
        if(started === true){
          setBase(Date.now())
          findTarget()
          setCDBool(props.cd)

        }
        
        
    }, [started])


    React.useEffect(() => {
        let timer;
        if (started === true && base > 0) {
            setCDBool(props.cd)
            timer = setInterval(() => {

            if(cdBool === false) //will be a count up timer
                setCountInterval(Date.now() - base);  
            else
                setCountInterval(base + target - Date.now());
                if(Date.now >= base+target){clearInterval(timer)}
            

          }, 1000);
        } else {
          clearInterval(timer);
        }
        return () => clearInterval(timer)
    }, [base], [countInterval])//count interval was here.
    
    React.useEffect(() => {
        if(countInterval >= 0)
            setSeconds(displayHMS(countInterval))
        else
            setSeconds("-"+displayHMS(countInterval*-1))
            

        if(countInterval > target && target > 0){//logic for when the countup hits the target
            setColor("#ff0000")
            setAlarm(true)
            playSound()



            
        }else if(countInterval < 0){
            if(alarm === false){
            setColor("#ff0000")

                setAlarm(true)
               playSound()
            }
        }
    }, [countInterval]) 


    

// --- render
    return (
        <View >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    paddingLeft: "0.5%",
                    paddingRight: "0.5%"
                }}>
                <View style={{width: '80%', borderWidth: 1, height: 42, justifyContent: 'center', alignItems: 'center', backgroundColor: 'powderblue'}} >
                    <Text style={timerStyle()}>{props.name} | {seconds}</Text>
                        
                </View>
                <View style={{width: '10%', height: 42, backgroundColor: 'black'}}>
                    <Button buttonStyle={{borderRadius: 0, borderWidth:1, borderColor: 'black', height: 42, backgroundColor: '#d9534f'}} 
                    icon={
                        <Icon
                        name='close'
                        type='evilicon'
                        size={23}
                        color="white"
                      />
                    } 

                    onPress={() => deleteData()}
                 
                    />  

                </View>
                <View style={{width: '10%', height: 42, backgroundColor: 'steelblue'}}>
                    <Button buttonStyle={{borderRadius: 0, borderWidth:1, borderColor: 'black', height: 42, backgroundColor: '#0275d8'}} 
                    icon={
                        <Icon
                        name='play'
                        type='evilicon'
                        size={23}
                        color="white"
                      />
                    }    

                    onPress={() => setStarted(true)}

                    />  

                </View>
            </View>
            
        </View> 
    )

}

export default PreciseTimer