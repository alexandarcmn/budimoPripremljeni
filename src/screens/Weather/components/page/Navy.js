import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'

const { width, height } = Dimensions.get('screen');

export default function Navy({ data }) {

    const [navyData, setNavyData] = useState();

    const fetchData = async () => {
        const resp = await fetch('http://www.meteo.co.me/app/prognoza/pomorci.json');
        const newData = await resp.json();
        setNavyData(newData);
    }

    useEffect(() => {
        fetchData();
        const dataInterval = setInterval(() => fetchData(), 60 * 1000);
        return () => clearInterval(dataInterval);
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Image
                    source={{ uri: navyData && navyData[Object.keys(navyData)[0]]?.photo }}
                    style={{ flex: 1, resizeMode: 'contain', width: width - 100, height: width - 100 }}
                />
            </View>
            <View style={styles.bottom}>
                <Text style={styles.title}>Za Pomorce</Text>
                <ScrollView>
                    <Text style={styles.desc}>{navyData && navyData[Object.keys(navyData)[0]]?.text}</Text>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height / 1.5,
        width,
    },
    top: {
        flex: 4,
        alignItems: 'center',
    },
    bottom: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    title: {
        color: '#fab816',
        fontSize: 20,
        fontWeight: '700'
    },
    desc: {
        color: '#A9A9A9',
        textAlign: 'center'
    }
})
