import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AccueilScreen from './screen/AcceuilScreen';
import CameraScreen from './screen/CameraScreen';
import Pageinfo1 from './screen/PageInfo1';
import Profile from './screen/Profile'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile" >
        <Stack.Screen name="Accueil" component={AccueilScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Pageinfo1" component={Pageinfo1} />
        <Stack.Screen name="Profile" component={Profile} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}