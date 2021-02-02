import React, { useState } from "react";
import { Text, View, ToastAndroid, Platform} from "react-native";
import { Audio } from 'expo-av';
import beep from '../sound/beep.mp3'


const timerStyle = () => {
    return "#ff0000";
}

const countUp = (base, format) =>{
 
        let ms = Date.now() - base;
        if(props.format === "seconds")
            setSeconds(ms)
        else{
            setSeconds(displayHMS(ms))
        }
        if(ms > this.state.target && props.type === "tar"){ //Once the timer is over target, turn it red
            setColor("#ff0000")
        }
      
}

const countDown = () =>{

    let ms = dest - Date.now();
        
    if(props.format === "seconds")
        setSeconds(ms);
    else if(ms < 0){
            if(cdComp === false){
                setCountCheck(true), () => {

                    if(Platform.OS === 'android'){
                        ToastAndroid.show("Timer is completed !", ToastAndroid.LONG);
        
                    }

                }
            }

            ms = ms*-1; //Negate to make the value positive, then concatenate a negative symbol to the formatting of the time so it can continue into the negatives.
            setSeconds("-"+displayHMS(ms))

        }
        else{
            setSeconds(displayHMS(ms))

        }
        
    
}

const findTarget = (hours, min, sec) => {
    
    let hms = hours ? hours * 3600000 : 0;
    let mms = min ? min * 60000 : 0;
    let sms = sec ? sec * 1000 : 0;
    let tms = hms + mms + sms; //total milliseconds

    findTarget(tms), () =>{
        console.log("test")

        if(props.type === "cd"){
            setDest(base + target)
        }

    }

}

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
    
const [seconds,dest,target] = useState(0);
const [base] = useState(Date.now())
const [color] = useState("#000")
const [countCheck] = useState(false)

const h = props.hours;
const m = props.minutes;
const s = props.seconds;

let timer

    React.useEffect(() => {
        console.log("hello")

        switch(props.type){
            case "cd":
               // setTarget(1,m,s) 

                timer = setInterval(() => {
                    countDown()
                  }, 1000);

                break;
            case "tar":
               // setTarget(h,m,s) 

                

                timer = setInterval(() => {
                    countUp(Date.now())
                  }, 1000);

                break;
            default:

                timer = setInterval(() => {
                    countUp(Date.now())
                  }, 1000);
        }


    }, [])

    return (
        <View >
            <Text>
                {seconds}
            </Text>
        </View> 
    )

}

export default PreciseTimer