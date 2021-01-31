import React, { Component } from "react";
import { Text, View } from "react-native";

class Clock extends Component {
    constructor(props) {
		super(props);
        
		this.state = {
            seconds : 0,
            timer : Date.now().toString()
        }
        
        this.countUp = this.countUp.bind(this);
    }

    componentDidMount(){
        this.timer = setInterval(this.countUp, 1000)
    }

    getDate(){
        const curTime = Date.now();
        
    }

    countUp() {
        let s = this.state.seconds + 1;
        let d = new Date();
        let hh = String(d.getHours()).padStart(2, '0');
        let mm = String(d.getMinutes()).padStart(2, '0');
        let ss = String(d.getSeconds()).padStart(2, '0');
        let dtstr = hh + ":" + mm + ":" + ss
        this.setState({
            seconds : s,
            date : dtstr
        })
      }


    render(){
        return(
                <Text>
                    {this.state.date}
                </Text>
        )
    }
}

export default Clock