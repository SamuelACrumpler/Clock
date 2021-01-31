import React, { Component } from "react";
import { Text, View } from "react-native";

class Timer extends Component {
    constructor(props) {
		super(props);

		this.state = {
            seconds : 0
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
        
        this.setState({seconds : s})
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

export default Timer