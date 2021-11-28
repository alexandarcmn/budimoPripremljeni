import React, { useRef } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
import Images from './images';

const bgColors = {
    home: 'rgba(53, 85, 174, 0.25)',
    weather: 'rgba(250, 184, 22, 0.25)',
    about: 'rgba(57, 167, 221, 0.25)'
}

const textColor = {
    home: '#3555ae',
    weather: '#fab816',
    about: '#39A7DD'
}

export default function Tab2({ tab, title, onPress, selected }) {

    const icon = !selected ? Images.icons[tab.name] : Images.icons[`${tab.name}Focused`]
    
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
            // activeOpacity={1} 
            onPress={() =>{
                ref.current.animateNextTransition();
                onPress()
            }}
        >
            <Transitioning.View 
                ref={ref}
                style={[styles.background, {backgroundColor: selected ? bgColors[tab.name] : 'white'}]}
                transition={transition}
            >
                <Image
                    style={styles.icon}
                    source={icon}
                />
                { selected && <Text style={[styles.label, { color: selected ? textColor[tab.name] : ''}]}>{title}</Text> }
            </Transitioning.View>
                
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        // padding: 10,
    },
    background: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        // margin: 6,
        paddingVertical: 10,
        paddingHorizontal: 20
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
