import React, { Component } from "react";
import { Text, View, ToastAndroid, Platform, StyleSheet } from "react-native";
import { Audio } from 'expo-av';
import beep from '../sound/beep.mp3'

const soundObject = new Audio.Sound();

class PreciseTimer extends Component {

    constructor(props) {
		super(props);

		this.state = {
            seconds : 0,
            target: 0,
            dest : 0,
            base : Date.now(),
            cdComp : false,
            color: "#000",
            audioClip: new Audio.Sound.createAsync(
                require('../sound/beep.mp3')
             )
        }
        const audioClip = new Audio.Sound();
        this.countUp = this.countUp.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    /*
        target timer
        countdown timer
    */

    playSound(){
        const soundObject = new Audio.Sound()

	try {
		let source = require('../sound/beep.mp3')
        soundObject.loadAsync(source).playAsync()
			.then(async playbackStatus => {
				setTimeout(() => {
					soundObject.unloadAsync()
				}, playbackStatus.playableDurationMillis)
			})
			.catch(error => {
				console.log(error)
			})
		
        } catch (error) {
            console.log(error)
        }
    }
    
    
    async componentDidMount(){
        // console.log(this.props.hours ? "exists" : 200*2)
        // console.log(this.state.base)
        // console.log("platform")
        // console.log(Platform.OS)

        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            shouldDuckAndroid: true,
            staysActiveInBackground: true,
            playThroughEarpieceAndroid: true
        })

        this.playSound()

        // this.sound = new Audio.Sound();
        // const status = { shouldPlay: true}
        // this.state.audioClip.loadAsync()
        // this.sound.loadAsync('./src/sound/bee.mp3', status, false)


        switch(this.props.type){
            case "cd":
                this.setTarget() 
                this.timer = setInterval(this.countDown, 1000);
                break;
            case "tar":
                this.setTarget() 
                this.timer = setInterval(this.countUp, 1000)
                break;
            default:
                this.timer = setInterval(this.countUp, 1000)  
        }

    }


    setTarget(){
        let hms = this.props.hours ? this.props.hours * 3600000 : 0;
        let mms = this.props.minutes ? this.props.minutes * 60000 : 0;
        let sms = this.props.seconds ? this.props.seconds * 1000 : 0;
        let tms = hms + mms + sms; //total milliseconds

        this.setState({target: tms}, () => {
            // console.log("target ms: " + this.state.target)
            if(this.props.type === "cd"){
                // console.log(typeof this.state.target)
                // console.log("base test: " +  (this.state.base + this.state.target))
                // console.log("base test: " + this.state.base)
                this.setState({ dest : this.state.base + this.state.target}, () =>{ //calculates the amount of milliseconds until the time should go off, from the base time pulled by date.now

                })

            }
        })
    }
    
    displayHMS(dur){
        let ss = Math.floor((dur / 1000) % 60);
        let mm = Math.floor((dur / (1000 * 60)) % 60);
        let hh = Math.floor((dur / (1000 * 60 * 60)));

        hh = String(hh).padStart(2, '0');
        mm = String(mm).padStart(2, '0');
        ss = String(ss).padStart(2, '0');
        let tStr = hh + ":" + mm + ":" + ss;
        return tStr;
    }
    
    countDown(){
            
        // add the milliseconds to date now from target
        // subtract values in between until 0 or over
        let ms = this.state.dest - Date.now();
        
        if(this.props.format === "seconds")
            this.setState({seconds : ms})
        else if(ms < 0){
        this.playSound()
            
            if(this.state.cdComp === false){
                
                this.setState({cdComp : true}, () => {
                    if(Platform.OS === 'android'){
                        ToastAndroid.show("Timer is completed !", ToastAndroid.LONG);
        

                    }else{console.log("not android")}
                })
                
            }

            ms = ms*-1; //Negate to make the value positive, then concatenate a negative symbol to the formatting of the time so it can continue into the negatives.
            this.setState({seconds : "-"+this.displayHMS(ms)})

        }
        else{
            this.setState({seconds : this.displayHMS(ms)})
        }
        
    }

    countUp() {
        let ms = Date.now() - this.state.base;
        if(this.props.format === "seconds")
            this.setState({seconds : ms})
        else{
            this.setState({seconds : this.displayHMS(ms)})
        }
        if(ms > this.state.target && this.props.type === "tar"){ //Once the timer is over target, turn it red
            this.setState({color: "#ff0000"})
        }
      }


    timerStyle(){
        return {
            color: this.state.color,
        }
    }

    render(){
        return(
            <View >
                <Text style={this.timerStyle()}>
                    {this.state.seconds}
                </Text>
            </View> 
        )
    }
    
    

}


export default PreciseTimer