import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function ScoreTableScreen() {

  const [userScores, setUserScores] = useState([]);
  const titleCols = ["Name", "Score"];

  const getObj = async () => {
    try {
      const jsonVal = await AsyncStorage.getItem('SCORE');
      const scoreItems = jsonVal != null ? JSON.parse(jsonVal) : null;
      if (scoreItems != null) {
        const revScoreItems = scoreItems.reverse();
        setUserScores([...revScoreItems]);
      }
    } catch(e) {
      console.log("error get object from storage ScoreTablScreen");
    }
  }

  useEffect(() => {
      getObj();
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Score Table</Text>
      {userScores.length > 0 && (
         <Table titleCols={titleCols} userScores={userScores} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 7,
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    color: 'black',
    justifyContent: 'center',
    alignItems:'center',
    fontWeight: 'bold',
    marginTop: 20,
    padding: 5

  }
})