import React, {useState} from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import PreciseTimer from "../component/preciseTimer"
import { Header, Button } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Home = ({navigation}) => {
    const [timers, setTimers] = useState([])
    const [focused, setFocused] = useState(false)

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@timers')
            console.log("test2222" +jsonValue)
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
        console.log('------fkfkfkfkfkfff')
        console.log(timers)
        if(timers === null){setTimers([])}
    }, [timers])


    useFocusEffect(
        React.useCallback(() => {
          getData()
          // Do something when the screen is focused
       
        }, [])
      );

    //May need to save data when transitioning???
    return (
    <SafeAreaProvider>
        <View>
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
            onPress={() => navigation.navigate('CRUD')}
            />    
            
            
        </View>
        

        </View>
    </SafeAreaProvider>
    )
}

export default Home
