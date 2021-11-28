import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import { SvgUri, SvgCssUri, SvgFromUri } from 'react-native-svg';

const { width, height } = Dimensions.get('screen');

export default function Today({ data }) {

    const [todayData, setTodayData] = useState();
    var today = new Date();
    var date = today.getDate() + 1 + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();

    const fetchData = async () => {
        const resp = await fetch('http://www.meteo.co.me/app/prognoza/dnevna.json');
        const newData = await resp.json();
        setTodayData(newData);
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
                    source={{ uri: todayData && todayData[Object.keys(todayData)[0]]?.photo }}
                    style={{ flex: 1, resizeMode: 'contain', width: width - 100, height: width - 100 }}
                />
            </View>
            <View style={styles.bottom}>
                <Text style={styles.title}>{date}</Text>
                <ScrollView>
                    <Text style={styles.desc}>{todayData && todayData[Object.keys(todayData)[0]]?.text}</Text>
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
