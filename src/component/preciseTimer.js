import React, { useState } from "react";
import { Text, View, ToastAndroid, Platform} from "react-native";
import { Audio } from 'expo-av';
import beep from '../sound/beep.mp3'



 



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


function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
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

const [countInterval, setCountInterval] = useState(0);
const [started, setStarted] = useState(true);



async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../sound/beep.mp3')
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


// --- Functions

const countUp = () =>{
 
    let ms = Date.now() - base;
    if(props.format === "seconds")
        setSeconds(ms)
    else{
        setSeconds(displayHMS(ms))
    }
    if(ms > target && props.type === "tar"){ //Once the timer is over target, turn it red
        setColor("#ff0000")
    }
  
}

const countDown = () =>{
    let ms = (base + target) - Date.now()
        
    if(props.format === "seconds")
        setSeconds(ms);
    else if(ms < 0){
        if(cdBool === false){
            console.log(cdBool)
                //playSound()
                setCDBool(true)
            }
            ms = ms*-1; //Negate to make the value positive, then concatenate a negative symbol to the formatting of the time so it can continue into the negatives.
            setSeconds("-"+displayHMS(ms))
        }
    else{
        setSeconds(displayHMS(ms))
    }
}

const findTarget = () => {
    let hms = props.hours ? props.hours * 3600000 : 0;
    let mms = props.min ? props.min * 60000 : 0;
    let sms = props.sec ? props.sec * 1000 : 0;
    let tms = hms + mms + sms; //total milliseconds
    setTarget(tms)
}

function Clock() {
    const [time, setTime] = React.useState(0);
    React.useEffect(() => {
      const timer = window.setInterval(() => {
        setTime(prevTime => prevTime + 1); // <-- Change this line!
      }, 1000);
      return () => {
        window.clearInterval(timer);
      };
    }, []);
  
    return (
      <div>Seconds: {time}</div>
    );
  }

const setTimer = () =>{

    let timer;

    switch(props.type){
        case "cd":
           findTarget()
            timer = window.setInterval(() => {
                countDown()
              }, 1000);
              return () => {
                window.clearInterval(timer);
              };
            break;
        case "tar":
           findTarget()

            

            timer = window.setInterval(() => {
                countUp()
              }, 1000);
              return () => {
                window.clearInterval(timer);
              };
            break;
        default:

            timer = window.setInterval(() => {
                countUp()
              }, 1000);
              return () => {
                window.clearInterval(timer);
              };
    }
}


const timerStyle = () => {
    return "#ff0000";
}


// --- OnComponentMount

React.useEffect(() => {
    console.log("cd" +cdBool)

    // switch(props.type){
    //     case "cd":
    //        findTarget()
    //         timer = window.setInterval(() => {
    //             countDown()
    //           }, 1000);
    //           return () => {
    //             window.clearInterval(timer);
    //           };
    //         break;
    //     case "tar":
    //        findTarget()

            

    //         timer = window.setInterval(() => {
    //             countUp()
    //           }, 1000);
    //           return () => {
    //             window.clearInterval(timer);
    //           };
    //         break;
    //     default:

    //         timer = window.setInterval(() => {
    //             countUp()
    //           }, 1000);
    //           return () => {
    //             window.clearInterval(timer);
    //           };
    // }

    findTarget()
    
    setCDBool(props.cd)
    setStarted(true)
    
}, [])

    // React.useEffect(() => {
    //     //setTimer()
    //     //setCDBool(true)

    // }, [seconds])


    React.useEffect(() => {
        console.log(cdBool)
        let timer;
        if (started) {
            timer = setInterval(() => {
            if(cdBool)
            setCountInterval(Date.now() + base);


            // console.log(countInterval);
            // if (countInterval > 100) {
            //   setCountInterval(0);
            //   setStarted(false);
            // }
          }, 1000);
        } else {
          clearInterval(timer);
        }
        return () => clearInterval(timer)
    }, [cdBool, countInterval])
    

    // React.useEffect(() => {
    //     if(props.type === "cd"){
    //         setDest(base + target)
    //     }
    // }, [target])
    // React.useEffect(() => {
    //     //console.log("test state change: " + cdBool)
    //     if(Platform.OS === 'android'){
    //         ToastAndroid.show("Timer is completed !", ToastAndroid.LONG);

    //     }
            

    // }, [cdBool])
    

// --- render
    return (
        <View >
            <Text style={timerStyle}>
                {seconds}
            </Text>
        </View> 
    )

}

export default PreciseTimer