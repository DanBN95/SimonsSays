import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectAllScores } from '../features/allScoresSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


const {width, height} = Dimensions.get('window');

const Table2 = () => {

    const [userScores, setUserScores] = useState([]);
    const [show, setShow] = useState(false);
    const titleCols = ["Name", "Score"];
  
    const getObj = async () => {
      try {
        const jsonVal = await AsyncStorage.getItem('SCORE');
        const scoreItems = jsonVal != null ? JSON.parse(jsonVal) : null;
        if (scoreItems != null) {
          setUserScores([...scoreItems]);
        }
      } catch(e) {
        console.log("error get object from storage ScoreTablScreen");
      }
    }

    useEffect(() => {
        if (userScores.length === 0)
            getObj();
        else {
            setShow(true);
        }
    },[])

  return (
    <View style={styles.container}>
        {show && (
                   <DataTable>
                   <DataTable.Header>
                       <DataTable.Title>#</DataTable.Title>
                       {titleCols.map((title, index) => {
                           return(
                           <DataTable.Title key={index}>{title}</DataTable.Title>
                           )
                       })}
       
                   </DataTable.Header>
       
                   {userScores.map((user, index) => {
                       return(
                       <DataTable.Row>
                           <DataTable.Cell key={index}>{index + 1}</DataTable.Cell>
                           <DataTable.Cell key={index}>{user.name}</DataTable.Cell>
                           <DataTable.Cell key={index}>{user.score}</DataTable.Cell>
                      </DataTable.Row>
                       )
                   })}
                
               </DataTable>
        )}
    {userScores.length > 0 && (
        <Text>Check</Text>
    )}
    </View>
  )
}

export default Table2;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: height,
        width: width
    },
    title: {
        fontSize: 40,
    }
})
