import React, { Component } from "react";
import { Text, View } from "react-native";

class PreciseTimer extends Component {
    constructor(props) {
		super(props);

		this.state = {
            seconds : 0,
            base : Date.now()
        }
        
        this.countUp = this.countUp.bind(this);
    }

    componentDidMount(){

        this.timer = setInterval(this.countUp, 1000)

        // var interval = 1000; // ms
        // var expected = Date.now() + interval;
        // setTimeout(step, interval);
        // function step() {
        //     var dt = Date.now() - expected; // the drift (positive for overshooting)
        //     if (dt > interval) {
        //         // something really bad happened. Maybe the browser (tab) was inactive?
        //         // possibly special handling to avoid futile "catch up" run
        //         console.log("error alart")
        //     }
        //     // do what is to be done
        //     console.log("dt: " + dt)
        //     console.log("exp: " + expected )
        //     expected += interval;
        //     setTimeout(step, Math.max(0, interval - dt)); // take into account drift
        // }

    }

    step() {
        var dt = Date.now() - expected; // the drift (positive for overshooting)
        if (dt > interval) {
            // something really bad happened. Maybe the browser (tab) was inactive?
            // possibly special handling to avoid futile "catch up" run
            console.log("error alart")
        }
        // do what is to be done
        console.log("dt: " + dt)
        console.log("exp: " + expected )
        expected += interval;
        setTimeout(step, Math.max(0, interval - dt)); // take into account drift
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
    
    countUp() {
        // let s = this.state.seconds + 1;
        let ms = Date.now() - this.state.base;
        if(this.props.type === "seconds")
            this.setState({seconds : ms})
        else{
            this.setState({seconds : this.displayHMS(ms)})
        }
      }


    render(){
        return(
            <View>
                <Text>
                    {this.state.seconds}
                </Text>
            </View> 
        )
    }
}

export default PreciseTimer