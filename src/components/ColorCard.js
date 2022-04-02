import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import flashColors from '../utils/colors/flashColors';

export default function ColorCard({color, onClick, flash}) {

    const [curColor, setCurColor] = useState(color);

    useEffect(() => {
        if (flash) {
            console.log(flash);
            switch(color) {
                case 'red':
                    setCurColor(flashColors.flashRed.backgroundColor)
                    break;
                case 'green':
                    setCurColor(flashColors.flashGreen.backgroundColor)
                    break;
                case 'blue':
                    setCurColor(flashColors.flashBlue.backgroundColor)
                    break;
                case 'yellow':
                    setCurColor(flashColors.flashYellow.backgroundColor)
                    break;
                } 
           console.log(curColor)
        
        } else {
            setCurColor(color);
        }
    },[flash])
   

    return (
    <TouchableOpacity 
    disabled={flash}
    onPress={onClick}
    style = {[{
        backgroundColor: curColor,
        height: 200,
        width: 200, 
    },
    flash ? flashColors.border : null
    ]}
    />
  )
}