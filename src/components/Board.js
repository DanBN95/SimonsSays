import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import ColorCard from './ColorCard'
import delays from '../utils/helper/delay';
import { useDispatch } from 'react-redux';
import { setScore } from '../features/scoreSlice';
import { useNavigation } from '@react-navigation/native';
import sounds from '../utils/sounds/sounds';
export default function Board({ isGameDone, setIsGameDone }) {

  const dispatch = useDispatch();

  const [isOn, setIsOn] = useState(false);
  const [touchDisabled, setTouchDisabled] = useState(true);
  
  const colors = ["green", "yellow", "red", "blue"];

  const initPlay = {
      isDisplay: false,
      colors: [],
      score: 0,
      isUserPlay : false,
      userColor: [],
  };

  const [colorFlash, setColorFlash] = useState("");
  const [play, setPlay] = useState(initPlay);

  const startHandle = () => {
    setIsOn(true);
  };

  const randColor = () => {
    let nextColor = colors[Math.floor(Math.random() * 4)];
    const copyPlayColors = [...play.colors];
    copyPlayColors.push(nextColor);
    setPlay({...play, colors: copyPlayColors});
  };

  const showSequence = async () => {
    console.log("play colors");
    console.log(play.colors);
    await delays(1000);
    for (let i=0; i<play.colors.length; i++) {
        setColorFlash(play.colors[i]);
        sounds(play.colors[i]);
        await delays(1000);
        setColorFlash("");
        await delays(1000);

        if (i === play.colors.length - 1) {
            //  copy might be unneccessry
            const copyPlayColors = [...play.colors];
            //  reversed color array so we can pop the last element and get the first selected color
            setPlay({
                ...play, 
                isDisplay: false,  
                isUserPlay: true, 
                userColor: copyPlayColors.reverse()
            });
            setTouchDisabled(false);
        }
    }
  };

  const handleCardClick = async (color) => {
    sounds(color);
    //  Display off, and it is user turn
    if (!play.isDisplay && play.isUserPlay) {
        
        const copyPlayColors = [...play.userColor];
        const curColor = copyPlayColors.pop();

        if (color === curColor) {
            //  user is still trying to complete sequence
            if (copyPlayColors.length) {
                setPlay({...play, userColor: copyPlayColors})
            
            //  user complete repeat sequence and move to the next level
            } else { 
                await delays(1000);
                setPlay({...play, isDisplay: true, isUserPlay: false, score: play.colors.length, userColor: []})
            }
        
        } else {
            // Wrong press. Break sequence
            await delays(1000);
            setPlay({...initPlay, score: play.colors.length}); 
            dispatch(setScore(play.score));
            // setIsGameDone(true);
            handleClose();  
        }
        await delays(1000);
        setColorFlash("");

    }
  }

  const handleClose = () => {
    setIsGameDone(true);
    setIsOn(false);
  }

  useEffect(() => {
    if (isOn) {
        setPlay({...initPlay, isDisplay: true});
    } else {
        setPlay(initPlay);
    }
  }, [isOn]);

  useEffect(() => {
    if (isOn && play.isDisplay) {
        randColor();        
    }
  }, [isOn, play.isDisplay])

  useEffect(() => {
      if(isOn && play.isDisplay && play.colors.length) {
        showSequence();
      }
  }, [isOn, play.isDisplay, play.colors.length])

    return (
    <View>
    <View style = {styles.container}>
        {colors.map((color, index) => {
            return (
            <ColorCard 
            key={index} 
            onClick={() => handleCardClick(color)} 
            color={color} 
            flash = {colorFlash === color}
            touchDisabled = {touchDisabled} />
        )})}

        {isOn && !play.isDisplay && !play.isUserPlay && play.score !== 0 && (
            <View style = {styles.gameOverDisplay}>
                <Text style={styles.scoreText}>Final Score: {play.score}</Text>
                <View>
                <Button title='Try Again' onPress={handleClose} />
                </View>
            </View>
        )}

        {!isOn && !play.score && (
         <View style = {styles.startBtn}>
        <Button title='start' onPress={startHandle}  />
        </View>
        )}
        {isOn && (play.isDisplay || play.isUserPlay) && (
         <View style = {styles.scoreDisplay}>
            <Text style = {styles.scoreText}>{play.score}</Text>
        </View>
        )}
    </View>
       
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: 400,
        height: 400,
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 50
    },
    startBtn: {
        position: 'absolute',
        width: 100,
        marginHorizontal: 150
    },
    scoreDisplay: {
        position: 'absolute',
        width: 100,
        height: 100,
        backgroundColor: 'black',
        borderRadius: 50,
        lineHeight: 100,
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal: 150
    },
    scoreText: {
        fontSize: 50,
        color: 'white',
        justifyContent: 'center',
        marginHorizontal: 35
    },
    gameOverDisplay: {
        position: 'absolute',
        width: 400,
        height: 400,
        backgroundColor: 'black',
        borderRadius: 200,
        lineHeight: 100,
        fontSize: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
})