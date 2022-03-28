import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import GameScreen from "../screens/GameScreen";
import ScoreTableScreen from "../screens/ScoreTableScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName="BottomTabNavigator" screenOptions={{headerShown: false}}>
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
            <Stack.Screen name="Game Screen" component={GameScreen} />
            <Stack.Screen name="Score Table" component={ScoreTableScreen} />
        </Stack.Navigator>
    )
}

export default AppStack;