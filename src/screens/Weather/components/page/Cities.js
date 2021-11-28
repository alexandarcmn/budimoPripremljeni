import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, ImageBackground, Dimensions, Animated, TouchableWithoutFeedback, Image } from 'react-native'

const { width, height } = Dimensions.get('screen');

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

export default function Cities({ data, navigation }) {

    const y = new Animated.Value(0);
    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y } } }],
        { useNativeDriver: true }
    )

    const cardHeight = height / 5;
    const isDisappearing = -cardHeight;
    const isTop = 0;
    const isBottom = height - cardHeight;
    const isApperaing = height;
    const [allCities, setAllCities] = useState();

    const fetchData = async () => {
        const resp = await fetch('http://www.meteo.co.me/app/analiza/weather_now.json');
        const newData = await resp.json();
        setAllCities(newData);
    }

    useEffect(() => {
        fetchData();
        const dataInterval = setInterval(() => fetchData(), 60 * 1000);
        return () => clearInterval(dataInterval);
    }, [])

    const redirectToCity = (city) => {
        navigation.navigate('cityWeather', {
            city,
            otherParam: 'ahhahahahahahhahahah'
        })
    }

    const renderCityDetails = (city) => {
        const newCity = allCities?.weatherNow?.data?.map(el => { return el.name === city.name ? el : null }).filter(val => { return val !== null })
        const humidity = parseInt(newCity && newCity[0]?.humidity)

        if (newCity && newCity.length === 0) {
            return <Text style={styles.wet_text}></Text>
        } else {
            return (
                <View style={[styles.flex_cent]}>
                    <View style={[styles.flex_cent, { flexDirection: 'column' }]}>
                        <Text style={styles.wet_label}>Temp.</Text>
                        <Text style={styles.wet_text}>{newCity && newCity[0]?.temperature}°C</Text>
                    </View>
                    <View style={[styles.flex_cent, styles.inf_box, { flexDirection: 'column' }]}>
                        <Text style={styles.wet_label}>Vjetar (Brzina)</Text>
                        <Text style={styles.wet_text}>{newCity && newCity[0]?.wind_speed}</Text>
                    </View>
                    <View style={[styles.flex_cent, { flexDirection: 'column' }]}>
                        <Text style={styles.wet_label}>Vlaznost</Text>
                        <Text style={styles.wet_text}>{!isNaN(humidity) && humidity}%</Text>
                    </View>
                </View>
            )
        }

    }

    return (
        <View style={styles.container}>
            <AnimatedFlatlist
                scrollEventThrottle={16}
                data={data.cities}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                bounces={false}
                // contentContainerStyle={{}}
                {...{ onScroll }}
                renderItem={({ item }) => {
                    return <TouchableWithoutFeedback onPress={() => redirectToCity(item)}>
                        <Animated.View
                            style={[styles.box,
                            {
                                transform: [
                                    {
                                        translateY: Animated.add(Animated.add(y, y.interpolate({
                                            inputRange: [0, 0.00001 + item.id * (height / 5)],
                                            outputRange: [0, -item.id * (height / 5)],
                                            extrapolateRight: "clamp"
                                        })),
                                            Animated.subtract(item.id * cardHeight, y).interpolate({
                                                inputRange: [isBottom, isApperaing],
                                                outputRange: [0, -cardHeight / 4],
                                                extrapolate: 'clamp'
                                            })
                                        ),
                                    },
                                    {
                                        scale: Animated.subtract(item.id * cardHeight, y).interpolate({
                                            inputRange: [isDisappearing, isTop, isBottom, isApperaing],
                                            outputRange: [0.5, 1, 1, 0.5],
                                            extrapolate: "clamp"
                                        })
                                    }
                                ],
                                opacity: Animated.subtract(item.id * cardHeight, y).interpolate({
                                    inputRange: [isDisappearing, isTop, isBottom, isApperaing],
                                    outputRange: [0.5, 1, 1, 0.5]
                                })
                            }
                            ]}

                        >
                            <ImageBackground
                                style={{ flex: 1 }}
                                source={{ uri: `http://meteo.co.me/app/foto/grad/${item.cityId}.jpg`}}
                                imageStyle={{ borderRadius: 20 }}
                            >
                                <View style={styles.box_wrapp}>
                                    <Text style={styles.city_name}>{item.name}</Text>
                                    <View style={styles.city_crest}>
                                        <Image
                                            source={{ uri: `http://meteo.co.me/app/foto/grb/${item.cityId === 'ADB' ? 'ULC' : item.cityId}.png`}}
                                            style={{ width: 40, height: 40 }}
                                        />
                                    </View>
                                    {renderCityDetails(item)}
                                </View>
                            </ImageBackground>
                        </Animated.View>
                    </TouchableWithoutFeedback>

                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height / 1.4,
        width,
        // backgroundColor: 'red'
    },
    box: {
        width: width - 60,
        height: height / 5,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 20
    },
    box_wrapp: {
        flex: 1,
        backgroundColor: 'rgba(250, 184, 22, 0.15)',
        borderRadius: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20
    },
    city_name: {
        color: '#F4F7FF',
        fontWeight: '700',
        fontSize: 25,
        textTransform: 'uppercase'
    },
    lottie: {
        height: (height / 5) / 2,
        width: (height / 5) / 2,
        position: 'absolute',
        right: -((height / 5) / 2) / 5,
    },
    flex_cent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wet_label: {
        color: '#F4F7FF',
        fontSize: 16
    },
    wet_text: {
        fontSize: 22,
        color: '#F4F7FF',
        fontWeight: 'bold'
    },
    inf_box: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderLeftColor: '#F4F7FF',
        borderRightColor: '#F4F7FF',
    },
    city_crest: {
        position: 'absolute',
        top: -10,
        right: -10,
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F4F7FF'
    }
})
