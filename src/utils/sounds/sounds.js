import React from 'react';
import SoundPlayer from 'react-native-sound-player';

export default sounds = (color) => {
    switch(color) {
        case "green":
            SoundPlayer.playUrl('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
            break;
        case "red":
            SoundPlayer.playUrl('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
            break;
        case "blue":
            SoundPlayer.playUrl('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
            break;
        case "yellow":
            SoundPlayer.playUrl('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
            break;
    }
}