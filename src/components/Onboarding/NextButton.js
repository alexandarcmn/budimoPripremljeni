import React, { useEffect, useRef } from 'react'
import { StyleSheet, Animated , TouchableOpacity, View, Image } from 'react-native'
import Svg, { G, Circle } from 'react-native-svg';

export default function NextButton({ percentage, scrollTo }) {

    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    
    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef(null);

    const animateProgress = useRef(toValue =>{
        Animated.spring(progressAnimation, {
            toValue,
            useNativeDriver: true
        }).start()
    }).current;

    useEffect(() => {
        animateProgress(percentage)
    }, [animateProgress, percentage])

    const firstIndicatorRotate = progressAnimation.interpolate({
        inputRange: [0, 50],
        outputRange: ['0deg', '180deg'],
        extrapolate: 'clamp'
    })

    const lastIndicatorRotate = progressAnimation.interpolate({
        inputRange: [0, 100],
        outputRange: ['0deg', '360deg'],
        extrapolate: 'clamp'
    })

    const lastIndicatorVisibility = progressAnimation.interpolate({
        inputRange: [0, 49, 50, 100],
        outputRange: [0, 0, 1, 1],
        extrapolate: 'clamp'
    })

    return (
        <View style={styles.container}>
            <View style={styles.emptyCircle}>
                <Animated.View style={[styles.indicator, { transform: [{ rotate: firstIndicatorRotate }] }]}/>
                <View style={styles.coverIndicator}/>
                <Animated.View style={[styles.indicator, { transform: [{ rotate: lastIndicatorRotate }], opacity: lastIndicatorVisibility }]}/>
            </View>
            <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
                <Image source={require('../../../assets/images/icons/right.png')}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyCircle:{
        borderColor: '#e6e7e8',
        justifyContent: 'center',
        alignItems: 'center',
        width: 128,
        height: 128,
        borderRadius: 128/2,
        borderWidth: 2,
        transform: [{rotate: "-45deg"}]
    },
    indicator:{
        width: 128,
        height: 128,
        borderRadius: 128/2,
        borderWidth: 2,
        position: 'absolute',
        borderLeftColor: '#fab816',
        borderTopColor: '#fab816',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent'
        
    },
    coverIndicator:{
        width: 128,
        height: 128,
        borderRadius: 128/2,
        borderWidth: 2,
        position: 'absolute',
        borderLeftColor: '#e6e7e8',
        borderTopColor: '#e6e7e8',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    button:{
        position: 'absolute',
        backgroundColor: '#fab816',
        borderRadius: 100,
        padding: 20
    }
})
