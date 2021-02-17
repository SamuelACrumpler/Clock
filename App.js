import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';

import Home from './src/screens/home';
import Crud from './src/screens/crud';
import Test from './src/screens/test';
import {CRUDScreen} from './src/screens/crud';

const Stack = createStackNavigator();


export default function App() {
  return (
    
      <NavigationContainer style={{backgroundColor:"blue"}}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Add Timer" component={Crud} />
          <Stack.Screen name="Test" component={Test} />
          
        </Stack.Navigator>
      </NavigationContainer>
  );
};