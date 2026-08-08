
//import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import  AppNavigator  from './navigation/AppNavigator';
//import {StudentRegistration} from './screens/StudentRegistration';
export default function App(){
  return(

    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
  );
}
  