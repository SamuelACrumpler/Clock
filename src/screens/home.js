import React, {useState} from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import PreciseTimer from "../component/preciseTimer"
import { Header, Button } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styMain from "../styles/styMain"



const Home = ({navigation}) => {
    const [timers, setTimers] = useState([])
    const image = { uri: "../assets/bg.png" };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@timers')
            if(jsonValue === null){
                setTimers([]);
            }else{
              setTimers(JSON.parse(jsonValue))

            }
        } catch(e) {
        // error reading value
        console.log("Error while loading data: " + e)
    
        }
    }

    const refresh = () =>{getData()}

    React.useEffect(() => { 
        getData()
    }, [])

    React.useEffect(() => { 
        if(timers === null){setTimers([])}
    }, [timers])


    useFocusEffect(
        React.useCallback(() => {
          getData()
          // Do something when the screen is focused
       
        }, [])
      );

    return (
    <SafeAreaProvider style={{ alignItems: 'center'}}>
        <View style={styMain()}>

        
            {
                timers.map((timer, index) => {
                    return <PreciseTimer key={index} index={index} name={timer.name} cd={timer.cd} hour={timer.hour} min={timer.min} sec={timer.sec} refresh={refresh} />
                })
            }
            <View
            style={{
                paddingLeft: "0.5%",
                paddingRight: "0.5%"
            }}>
                <Button title="Add Timer" 
                onPress={() => navigation.navigate('Add Timer')}
                />    
                
                
            </View>
        
        </View>

    </SafeAreaProvider>
    )
}

export default Home
