import React, { useState } from "react";

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button, Input, ButtonGroup} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { interpolate } from "react-native-reanimated";

export default function CRUD({navigation}) {
    const [selectedIndex,setSelected] = useState(1);
    const [cdBool, setCD] = useState(false)
    const [test,setTest] = useState(1);
    const [name,setName] = useState("");
    const [timers, setTimers] = useState([])
    const [data,setData] = useState({});
    const [hour,setHour] = useState([]);
    const [minsec,setMinsec] = useState([]);
    const [sec,setSec] = useState(0);
    const [hourI,setHourI] = useState(0);
    const [minI,setMinI] = useState(0);
    const [secI,setSecI] = useState(0);



    const buttons = ['Countdown','Countup']
    const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

    const updateIndex = () => {
        if(selectedIndex === 1)
        
            setSelected(0)
        else
            setSelected(1)
      }
      
    // const getData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('@timers')

    //         if(value !== null) {
    //         // value previously stored
    //             console.log(value[0])
    //             setTimers(value)
    //         }else{
    //             //do nothing?  
    //         }
    //     } catch(e) {
    //         console.log("Error while loading data: " + e)
    //         // error reading value
    //     }
    // }

    
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@timers')
            console.log(jsonValue)
            let testx = JSON.parse(jsonValue)
            console.log(testx[0])
            setTimers(JSON.parse(jsonValue))
        } catch(e) {
        // error reading value
        console.log("Error while loading data: " + e)

        }
    }

    const storeData = async (value) => {
        let tdata = []
        if(timers !== null || timers !== undefined){
            tdata = timers
        }
        tdata.push(value)
        console.log(tdata)
        const jsonValue = JSON.stringify(tdata)
        try {
          await AsyncStorage.setItem('@timers', jsonValue)
        } catch (e) {
          // saving error
          console.log("Error while saving data: " + e)
        }
    }

    const loadData = () => {

    }

    const saveData = () => {
        console.log("name: " + name)
        console.log("cd: " + cdBool)
        console.log("hour: " + hourI)
        console.log("min: " +  minI)
        console.log("sec: " + secI)
        //insert logic for completely new timer here.
        let tData = {}
        tData.id = 0; //pull the last value in the array.
        tData.hour = hourI;
        tData.min = minI;
        tData.sec = secI;
        tData.name = name;
        tData.cd = cdBool;
        tData.time = 0;//milliseconds on the timer, needs to get pulled when editing.
        storeData(tData)
        //navigation.navigate('Home')
    }
    

    React.useEffect(() => {
        let thour = [] 
        let tminsec = []
        
        for(var i = 0; i < 60; i++){
            tminsec.push(i)
        }
        for(var i = 0; i < 100; i++){
            thour.push(i)
        }
        setHour(thour)
        setMinsec(tminsec)

    }, [sec])

    React.useEffect(() => {
        //console.log("test")
    }, [hour])

    React.useEffect(() => {
        console.log(Date.now()+5000)
        console.log("----------------")
        console.log(timers[0])
        console.log(timers)

    }, [timers])

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

    

    return (
    <SafeAreaProvider>
        <View>
        <Input
            placeholder='Name'
            onChangeText={value => setName(value)}
        />
        <ButtonGroup
            onPress={() => updateIndex()}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{height: 100}}
        />
            
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'stretch',
                paddingLeft: "0.5%",
                paddingRight: "0.5%"
            }}>
                <View style={{width: '33%', height: 30, backgroundColor: 'powderblue'}} >
                    <Text style={{fontWeight: "bold", fontSize: 20, textAlign: 'center', justifyContent: 'center'}}>Hours</Text>
                        
                </View>
                <View style={{width: '34%', height: 30, backgroundColor: 'skyblue'}}>
                    <Text style={{fontWeight: "bold", fontSize: 20, textAlign: 'center', justifyContent: 'center'}}>Minutes</Text>

                </View>
                <View style={{width: '33%', height: 30, backgroundColor: 'steelblue'}}>
                    <Text style={{fontWeight: "bold", fontSize: 20, textAlign: 'center', justifyContent: 'center'}}>Seconds</Text>

                </View>
            </View>
            
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'stretch',
                paddingLeft: "0.5%",
                paddingRight: "0.5%"
            }}>
                <Picker
                    selectedValue={hourI}
                    style={{height: 50, width: '33%'}}
                    onValueChange={(itemValue, itemIndex) =>
                        setHourI(itemValue)
                    }>

                    {
                        hour.map((num) => {
                            return <Picker.Item key={"picker"+num} label={num} value={num}  />
                        })
                    }
                    
                </Picker>
                <Picker
                    selectedValue={minI}
                    style={{height: 50, width: '34%'}}
                    onValueChange={(itemValue, itemIndex) =>
                        setMinI(itemValue)
                    }>
                        
                    {
                        minsec.map((num) => {
                            return <Picker.Item key={"picker"+num} label={num} value={num}  />
                        })
                    }
                    
                </Picker>
                <Picker
                    selectedValue={secI}
                    style={{height: 50, width: '33%'}}
                    onValueChange={(itemValue, itemIndex) =>
                        setSecI(itemValue)
                    }>
                        
                    {
                        minsec.map((num) => {
                            return <Picker.Item key={"picker"+num} label={num} value={num}  />
                        })
                    }
                    
                </Picker>
            </View>

            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'stretch',
                paddingLeft: "0.5%",
                paddingRight: "0.5%"
            }}>
                <View style={{width: '33%', height: 50, backgroundColor: 'powderblue'}} >
                    <Button title="Save" 
                        onPress={() => saveData()}
                    />  
                                        
                </View>
                <View style={{width: '34%', height: 50, backgroundColor: 'skyblue'}}>

                </View>
                <View style={{width: '33%', height: 50, backgroundColor: 'steelblue'}}>
                    <Button title="Add Timer" 
                        onPress={() => navigation.navigate('Home')}
                    />  
                </View>
            </View>

        
            
        </View>
    </SafeAreaProvider>
    )
}
