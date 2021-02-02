import React, { Component } from "react";
import { Text, View } from "react-native";

class Timer extends Component {
    constructor(props) {
		super(props);

		this.state = {
            seconds : 0,
            color: "#000"
        }
        
        this.countUp = this.countUp.bind(this);
    }

    componentDidMount(){
        console.log("mounted")
        if(this.props.type === "ms")
            this.timer = setInterval(this.countUp, 1)
        else{
            this.timer = setInterval(this.countUp, 1000)
        }
    }

    countUp() {
        let s = this.state.seconds + 1;
        if(s > 5){this.setState({color: "#ff0000"})}
        this.setState({seconds : s})
      }

    targetStyle(){
        return {
            color: this.state.color,
            fontWeight: 'bold'
        }
    }


    render(){
        return(
            <View>
                <Text style={this.targetStyle()}>
                    {this.state.seconds}
                </Text>
            </View> 
        )
    }
}

export default Timer