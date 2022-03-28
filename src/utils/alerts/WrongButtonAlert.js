import { View, Text, Alert, StyleSheet, Modal, TextInput, SafeAreaView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectScore, setName } from '../../features/scoreSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default wrongBtnPressed = ({onDismiss}) => {

    const [modalVisible, setModalVisible] = useState(true);
    const [name, setUserName] = useState(" ");
    const dispatch = useDispatch();

    const userScore = useSelector(selectScore);

    const handleSubmit = async () => {
        //AsyncStorage.clear();
        dispatch(setName(name));
        
        const result = {...userScore, name: name}

        const json = await AsyncStorage.getItem('SCORE');
        const storageItems = json != null ? JSON.parse(json) : null

        if (storageItems != null) {
            storageItems.push(result);
            storageItems.sort((a,b) => a.score - b.score);
            console.log("after sorting")
            console.log(storageItems);

            if (storageItems.length > 10) {
                // pop the item with the smallest score
                storageItems.pop();
            }
            let storageJson = JSON.stringify(storageItems);
            await AsyncStorage.setItem('SCORE', storageJson);
        
        // First time adding
        } else {
            const scoreNew = [];
            scoreNew.push(result);
            const json = JSON.stringify(scoreNew);
            await AsyncStorage.setItem('SCORE', json);
        }
        
        setUserName('');
        setModalVisible(false);
        onDismiss();
    }

    return (
        <View style = {styles.centeredView}>
            <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onDismiss = {onDismiss}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <SafeAreaView>
                        <Text style={styles.textScore}>Play Score is: {userScore.score}!</Text>
                        <TextInput  
                            style = {styles.input}
                            onChangeText = {(text) => setUserName(text)}
                            placeholder = {"Add your name to the score table"}
                            numberOfLines = {1}
                        />
                        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
                            <Text>Submit</Text>
                        </Pressable>
                        </SafeAreaView>
                        
                    </View>
                </View>

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
    },
    input: {
        height: 40,
        margin: 20,
        borderWidth: 1,
        padding: 10,
    },
    textScore: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtn: {
        alignItems: 'center',
        fontSize: 10,
        fontWeight: 'bold',
    }
})

// Alert.alert(
//     "Wrong Color Pressed!",
//     "",
//     [
//         {
//             text: "Try Again",
//             onPress
//         }
//     ]
// );