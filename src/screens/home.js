import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import PreciseTimer from "../component/preciseTimer"
import { Header, Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Home = ({navigation}) => {
    //May need to save data when transitioning???
    return (
    <SafeAreaProvider>
        <View>
        <Button title="Add Timer" 
        onPress={() => navigation.navigate('CRUD')}
        />    
        <Button title="Test Page" 
        onPress={() => navigation.navigate('Test')}
        />
        
        </View>
    </SafeAreaProvider>
    )
}

export default Home
