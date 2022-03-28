import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react';
import Board from '../components/Board';
import WrongButtonAlert from '../utils/alerts/WrongButtonAlert';
import { useNavigation } from '@react-navigation/native';


export default function GameScreen() {

  const [isGameDone, setIsGameDone] = useState(false);
  const navigation = useNavigation();

  const navResults = () => {
    navigation.navigate("Score Table");
  };

  useEffect(() => {
    console.log("is game done:" + isGameDone);
  },[isGameDone]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        setIsGameDone(false);
    })
    return unsubscribe;
  },[navigation])

  return (
    <View style = {styles.container}>
      <Text style={styles.title}>Game Screen</Text>
      {!isGameDone && (
        <Board isGameDone={isGameDone} setIsGameDone={setIsGameDone}/>
      )}

      {isGameDone && (
        <WrongButtonAlert onDismiss = {navResults} />
      )}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 7,
  },
  title: {
    fontSize: 50,
    color: 'black',
    justifyContent: 'center',
    marginHorizontal: 40,
    fontWeight: 'bold',
    marginTop: 20,
    padding: 5

  }
})