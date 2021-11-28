import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Animated, Image, Dimensions, ImageBackground } from 'react-native'
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('screen');

const Splash = ({ navigation }) => {

    const [logoAnimated, setLogoAnimated] = useState(new Animated.Value(0));
    const [logoText, setLogoText] = useState(new Animated.Value(0));
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const onboardingState = useSelector(state => state.onboarding_reducer);

    useEffect(() => {
        Animated.parallel([
            Animated.spring(logoAnimated, {
                toValue: 1,
                tension: 10,
                friction: 2,
                duration: 1000
            }).start(),
            Animated.timing(logoText, {
                toValue: 1,
                duration: 1200,
            })
        ]).start(() => {
            setLoadingSpinner(true)
        })
        setTimeout(() => {
            if (onboardingState.initialCity !== '') {
                navigation.navigate('mainScreen')
            } else {
                navigation.navigate('onboarding');
            }
        }, 2000);
    }, [])

    return (
        <View style={styles.container}>
            {/* <ImageBackground 
                style={{width, height}}
                // style={{width, height}}
                source={require('../../../assets/images/bgd-768.png')}
            > */}
            <Image source={require('../../../assets/images/bgd-320-5.png')}
                style={{ width, height }}
                resizeMode="stretch"
            />
            <Text style={styles.disclamerText}>Mobilna aplikacija je izrađena uz finansijsku podršku Evropske unije i
                Ministarstva javne uprave, digitalnog društva i medija Crne Gore.
                Sadržaj aplikacije isključiva je odgovornost Fondacije za razvoj sjevera
                Crne Gore - FORS Montenegro i Zavoda za hidrometeorologiju i
                seizmologiju Crne Gore i ni pod kojim se uslovima ne može smatrati da
                odražava stavove Evropske unije i Ministarstva javne uprave, digitalnog
                drustva i medija.</Text>

            {/* </ImageBackground> */}
            {/* <Animated.View 
            //     style={[styles.logoBox,{

            //         opacity: logoAnimated,
            //         top: logoAnimated.interpolate({
            //             inputRange: [0, 1],
            //             outputRange: [80, 0]     
            //         })
            //     }]}
            // >
            // </Animated.View>
            // <Animated.View
            //     style={{
            //         opacity: logoText,
                    
            //     }}
            // >
            //     <Text style={[styles.logoText, { marginTop: 20 }]}>Budimo Pripremljeni</Text>
            // </Animated.View>
            // <Animated.View style={styles.logoWrapp}>
            //     <Image
            //         source={require('../../../assets/images/icons9.png')}
            //         style={{ width, height: 120, resizeMode: 'contain'}}
            //     />
            // </Animated.View> */}
        </View>
    )
}

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: "column"
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#3555ae',
        // position: 'relative'
    },
    logoBox: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    disclamerText: {
        position: 'absolute',
        bottom: 30,
        fontSize: 12,
        color: '#777777',
        textAlign: 'center',
        paddingHorizontal: 10
    },
    logoText: {
        color: '#ffffff',
        fontFamily: 'GeoogleSans-Bold',
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center'
    },
    logoWrapp: {
        position: 'absolute',
        bottom: 20,
        width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
