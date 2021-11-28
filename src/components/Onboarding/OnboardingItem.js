import React from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import LottieView from 'lottie-react-native';

import InitialCity from './InitialCity';

export default function OnboardingItem({item, currentIndex}) {

    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, {width}]}>
            {   
                item.cities ? 
                <InitialCity item={item}/>
                :
                <>
                    <LottieView 
                        source={item.image} 
                        autoPlay 
                        loop
                        style={[styles.image, {width}]}
                    />
                    <View style={{flex: 0.4}}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 10,
        color: '#fab816',
        textAlign: 'center'
    },
    description:{
        fontWeight: '300',
        color: '#ccc',
        textAlign: 'center',
        paddingHorizontal: 34
    }
});