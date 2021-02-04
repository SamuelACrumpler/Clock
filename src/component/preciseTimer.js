import React, { useState } from "react";
import { Text, View, ToastAndroid, Platform} from "react-native";
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
const [base, setBase] = useState(Date.now())
const [color, setColor] = useState("#000")
const [cdBool, setCDBool] = useState(false)
const [tarBool, setTarBool] = useState(false)
const [sound, setSound] = React.useState();
const [alarm, setAlarm] = useState(false);


const [countInterval, setCountInterval] = useState(0);
const [started, setStarted] = useState(true);



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
    return {color : color}
}


// --- call back functions

    React.useEffect(() => {

        setStarted(true)
        findTarget()
        setCDBool(props.cd)
        
    }, [base])

  

    React.useEffect(() => {
        let timer;
        if (started) {
            timer = setInterval(() => {
            if(cdBool === false) //will be a count up timer
                setCountInterval(Date.now() - base);  //Might not need to set count interval, instead just set seconds here
            else
                // setCountInterval((base + target) - Date.now());
                setCountInterval(base + target - Date.now());
            

          }, 1000);
        } else {
          clearInterval(timer);
        }
        return () => clearInterval(timer)
    }, [cdBool, countInterval])
    
    React.useEffect(() => {
        if(countInterval >= 0)
            setSeconds(displayHMS(countInterval))
        else
            setSeconds("-"+displayHMS(countInterval*-1))
            

        if(countInterval > target && target > 0){
            setColor("#ff0000")
            //add alarm sound here too

            //logic for when the countup hits the target
        }else if(countInterval < 0){
            if(alarm === false){
            setColor("#ff0000")

                setAlarm(true)
                //android toast will go here
                //playSound()
            }
        }
    }, [countInterval])


    

// --- render
    return (
        <View >
            <Text style={timerStyle()}>
                {seconds}
            </Text>
        </View> 
    )

}

export default PreciseTimer