import React, {useState} from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button } from 'react-native-elements';
import PreciseTimer from "../component/preciseTimer"
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function CRUD() {

    const [timers, setTimers] = useState([])
    const [data,setData] = useState({});

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@timers')
        setTimers(JSON.parse(jsonValue))
    } catch(e) {
    // error reading value
    console.log("Error while loading data: " + e)

    }
}

const refresh = () =>{getData()}

React.useEffect(() => {
    getData()
    let tData = {}
    tData.id = 0; //pull the last value in the array.
    tData.hour = 0;
    tData.min = 0;
    tData.sec = 0;
    tData.name = '';
    tData.cd = false;
    tData.time = 0;//milliseconds on the timer
    setData(tData)
}, [])

React.useEffect(() => {
}, [timers])




    return (
    <SafeAreaProvider>
        <View>
            <Text>Work in Progress</Text>
            <PreciseTimer cd={false} />
            <PreciseTimer type="tar" cd={false} sec={5} />
            <PreciseTimer type="cd" cd={true} sec={5} />
            {
                timers.map((timer, index) => {
                    return <PreciseTimer index={index} name={timer.name} cd={timer.cd} hour={timer.hour} min={timer.min} sec={timer.sec} refresh={refresh} />
                })
            }
        </View>
    </SafeAreaProvider>
    )
}
