import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectAllScores } from '../features/gameOnSlice';

const {width, height} = Dimensions.get('window');

const Table = ({titleCols, userScores}) => {

  return (
    <View style={styles.container}>
                   <DataTable>
                   <DataTable.Header>
                       <DataTable.Title>#</DataTable.Title>
                       {titleCols.map((title, index) => {
                           return (
                            <DataTable.Title key={index}>{title}</DataTable.Title>
                           )
                       })}
                   </DataTable.Header>
       
                   {userScores.map((user, index) => {
                       return (
                        <DataTable.Row>
                            <DataTable.Cell key={index}>{index + 1}</DataTable.Cell>
                            <DataTable.Cell key={index}>{user.name}</DataTable.Cell>
                            <DataTable.Cell key={index}>{user.score}</DataTable.Cell>
                        </DataTable.Row>
                        )
                   })}
               </DataTable>
    </View>
  )
}

export default Table;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: height,
        width: width
    },
    title: {
        fontSize: 30,
    }
})
