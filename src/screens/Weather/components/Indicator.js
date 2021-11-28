import React from 'react'
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen');

export default function Indicator({ measures, scrollX, data }) {
    
    const inputRange = data && data.map((_, i) => i * width);
    const indicatorWidth = scrollX && scrollX.interpolate({
        inputRange,
        outputRange: measures && measures.map(measure => measure.width)
    })
    const translateX = scrollX && scrollX.interpolate({
        inputRange,
        outputRange: measures && measures.map(measure => measure.x)
    })

    return (
        <Animated.View 
            style={[
                styles.indicator, 
                {
                    width: indicatorWidth, 
                    left: 0,
                    transform:[{
                        translateX 
                    }]
                }
            ]}
        />
    )
}

const styles = StyleSheet.create({
    indicator:{
        position: 'absolute',
        height: 2,
        backgroundColor: '#F4F7FF',
        bottom: 15
    }
})
