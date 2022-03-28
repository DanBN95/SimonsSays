import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GameScreen from '../screens/GameScreen';
import ScoreTableScreen from '../screens/ScoreTableScreen';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Game Screen' 
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      style: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#ffffff',
        flex: 1,
        borderRadius: 15,
        height: 90,
        ...styles.shadow
      },
      }}>
      <Tab.Screen name="Game Screen" component={GameScreen} 
      options = {{
        tabBarIcon: ({ focused }) => (
          <View style = {{ alignItems: 'center', justifyContent: 'center' }}>
            <Image 
            source = { require('../assets/gamepad.png') }
            resizeMode = 'contain'
            style = {{
              width: 25,
              height: 25,
              tintColor: focused ? '#ffa000' : '#748c94',
            }}
            />
            <Text style = {{color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>
              Game Screen
            </Text>
          </View>
        )
      }} 
      />
      <Tab.Screen name="Score Table" component={ScoreTableScreen} 
      options = {{
        tabBarIcon: ({ focused }) => (
          <View style = {{ alignItems: 'center', justifyContent: 'center' }}>
            <Image 
            source = { require('../assets/scoreboard.png') }
            resizeMode = 'contain'
            style = {{
              width: 25,
              height: 25,
              tintColor: focused ? '#ffa000' : '#748c94',
            }}
            />
            <Text style = {{color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>
              Score Board
            </Text>
          </View>
        )
      }} 
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset : {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
});