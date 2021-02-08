import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button } from 'react-native-elements';
import PreciseTimer from "../component/preciseTimer"

export default function CRUD() {
    return (
    <SafeAreaProvider>
        <View>
            <Text>Work in Progress</Text>
            <PreciseTimer cd={false}/>
            <PreciseTimer type="tar" cd={false} sec={5}/>
            <PreciseTimer type="cd" cd={true} sec={5}/>
        </View>
    </SafeAreaProvider>
    )
}
