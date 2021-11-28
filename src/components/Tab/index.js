import React, { useRef } from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Images from './images';
import { Transition, Transitioning } from 'react-native-reanimated';

const bgColors = {
    home: 'rgba(9, 111, 180, 0.5)',
    weather: 'rgba(9, 111, 180, 0.5)',
    about: 'rgba(57, 167, 221, 0.5)'
}

export default function Tab({ label, title, accessibilityState, onPress }) {

    const focused = accessibilityState.selected;
    const icon = !focused ? Images.icons[label] : Images.icons[`${label}Focused`]
    
    const transition = (
        <Transition.Sequence>
            <Transition.Out type="fade" durationMs={0} />
            <Transition.Change interpolation="easeInOut" durationMs={200} />
            <Transition.In type="fade" durationMs={100} />
        </Transition.Sequence>
    )

    const ref = useRef()

    return (
        <TouchableWithoutFeedback 
            style={styles.container} 
            onPress={() => {
                ref.current.animateNextTransition();
                onPress()
            }}
        >
            <Transitioning.View 
                ref={ref}
                style={[styles.background, {backgroundColor: focused ? bgColors[label] : 'white'}]}
                transition={transition}
            >
                <Image
                    style={styles.icon}
                    source={icon}
                />
                { focused && <Text style={[styles.label, { color: focused ? '#fab816' : '' }]}>{title}</Text> }
            </Transitioning.View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    background: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        margin: 6
    },
    icon: {
        height: 24,
        width: 24
    },
    label: {
        fontWeight: '700',
        marginLeft: 8
    }
})
