import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import PreciseTimer from "./src/component/preciseTimer"
import { Header, Button } from 'react-native-elements';


export default function Home() {
    return (
    <SafeAreaProvider>
        <View>
        <Button title="Add Timer" />
            
        </View>
    </SafeAreaProvider>
    )
}
