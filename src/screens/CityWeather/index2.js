import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, FlatList, TouchableOpacity, Pressable, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { SvgUri } from 'react-native-svg';

const { width, height } = Dimensions.get('screen');

export default function CityWeather({ route, navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [currModDay, setCurrModDay] = useState('');
    const [cityData, setCityData] = useState();
    const { city, otherParam } = route.params;

    const fetchData = async () => {
        const resp = await fetch(`http://www.meteo.co.me/app/model/${city.cityId}`);
        const newData = await resp.json();
        setCityData(newData);
    }

    useEffect(() => {
        fetchData();
        const dataInterval = setInterval(() => fetchData(), 60 * 1000);
        return () => clearInterval(dataInterval);
    }, [])

    const navigateBack = () => navigation.goBack();

    const openModal = (day) => {
        setModalVisible(true)
        setCurrModDay(day);
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.header}>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.back_btn} activeOpacity={1} onPress={() => navigateBack()}>
                            <Image
                                source={require('../../../assets/images/icons/back.png')}
                                style={{ width: 25, height: 25 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={{ flex: 3, position: 'relative', width: width / 2, height: width / 2 }}>
                        <Image
                            source={{ uri: city.image }}
                            style={{
                                width: width / 2,
                                height: width / 2,
                                borderRadius: (width / 2) / 2
                            }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                top: -10,
                                right: 10,
                                width: 80,
                                height: 80,
                                backgroundColor: '#fff',
                                borderRadius: 40,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                source={{ uri: `http://meteo.co.me/app/foto/grb/${city.cityId === 'ADB' ? 'ULC' : city.cityId}.png` }}
                                style={{
                                    width: 45,
                                    height: 45
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <Text style={[styles.headCity, { textTransform: 'uppercase' }]}>{city.name}</Text>
                        <Text style={[styles.headDate, { textAlign: 'center' }]}>Izaberite dan za koji želite da pogledate kompletnu vremensku prognozu za grad {city.name}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.other}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                    >
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <View style={styles.modal}>
                                <TouchableOpacity
                                    style={styles.close_btn}
                                    onPress={() => setModalVisible(false)}
                                    activeOpacity={1}
                                >
                                    <Image source={require('../../../assets/images/icons/close.png')} />
                                </TouchableOpacity>
                                {/* <Text style={styles.mod_headline}>{city.name}, {currModDay && currModDay}</Text> */}
                                <View style={{ flex: 1, marginVertical: 10, paddingHorizontal: 10, position: 'relative' }}>
                                    {
                                        currModDay && currModDay?.hourlyForecast.map((curr, idx) => {
                                            return (
                                                <View key={idx} style={styles.mod_weat_box}>
                                                    <Text style={styles.mod_day_time}>{currModDay && currModDay.date} {curr && curr.hour}:00</Text>
                                                    <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                                                        <View style={styles.mod_day_param}>
                                                            <Text style={[styles.more_btn_text, { color: '#fab816', fontWeight: '700' }]}>Tmin</Text>
                                                            <Text style={styles.more_btn_text}>{currModDay && currModDay.tmin}°C</Text>
                                                        </View>
                                                        <View style={styles.mod_day_param}>
                                                            <Text style={[styles.more_btn_text, { color: '#fab816', fontWeight: '700' }]}>Tmax</Text>
                                                            <Text style={styles.more_btn_text}>{currModDay && currModDay.tmax}°C</Text>
                                                        </View>
                                                        <View style={styles.mod_day_param}>
                                                            <Text style={[styles.more_btn_text, { color: '#fab816', fontWeight: '700' }]}>RR(mm)</Text>
                                                            <Text style={styles.more_btn_text}>{curr && curr.RR}</Text>
                                                        </View>
                                                        <View style={[styles.mod_day_param, { borderRightWidth: 0 }]}>
                                                            <Text style={[styles.more_btn_text, { color: '#fab816', fontWeight: '700' }]}>RH(%)</Text>
                                                            <Text style={styles.more_btn_text}>{curr && curr.RH}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ position: 'absolute', left: -30 }}>
                                                        <SvgUri
                                                            width="75"
                                                            height="75"
                                                            uri={`http://meteo.co.me/Meteorologija/Pr/Gradovi/5danaA/Simbolcici/${curr && curr.symbol}`}
                                                        />
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <FlatList
                        data={cityData && cityData?.forecast}
                        keyExtractor={item => item && item.date}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            padding: 20
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.city_box}>
                                    <View style={styles.flex_cent}>
                                        <Icon
                                            name="calendar"
                                            size={40}
                                            color="#fff"
                                        />
                                    </View>
                                    <View style={[styles.flex_cent, { flexDirection: 'column' }]}>
                                        <Text style={styles.headDate, { color: '#F4F7FF' }}>{item && item.date}</Text>

                                        <TouchableOpacity
                                            style={styles.more_btn}
                                            onPress={() => openModal(item)}
                                            activeOpacity={1}
                                        >
                                            <Text style={styles.more_btn_text}>Detaljnije</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flex_cent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    flex_even: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    header: {
        padding: 20,
        width,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    back_btn: {
        backgroundColor: '#fab816',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        flex: 4,
        width,
        backgroundColor: '#F4F7FF'
    },
    other: {
        flex: 2,
        backgroundColor: '#fab816',
        width,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    body: {
        flex: 5,
        alignItems: 'center'
        // backgroundColor: 'blue'
    },

    headDate: {
        color: '#a9a9a9',
        fontSize: 15
    },
    headCity: {
        color: '#fab816',
        fontSize: 25,
        fontWeight: '700'
    },
    inf_box: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderLeftColor: '#F4F7FF',
        borderRightColor: '#F4F7FF',
    },
    wet_label: {
        color: '#F4F7FF',
        fontSize: 14
    },
    wet_text: {
        fontSize: 25,
        color: '#fab816',
        // fontWeight: '700'
    },
    city_box: {
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        width: width / 3,
        height: 130,
        backgroundColor: 'rgba(244, 247, 255, 0.25)',
        padding: 10,
        marginHorizontal: 5
        // backgroundColor: 'white'
    },
    more_btn: {
        width: (width / 3) - 20,
        height: 30,
        backgroundColor: 'rgba(244, 247, 255, 0.25)',
        borderRadius: 10,
        color: '#fab816',
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    more_btn_text: {
        color: '#F4F7FF',
        fontWeight: '600',
        // textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    },
    modal: {
        width: width - 20,
        // height: height - 140,
        flex: 1,
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: '#57abe2',
        alignSelf: 'center',
        // marginTop: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 50,
        position: 'relative'
        // borderColor: '#fab816',
        // borderWidth: 5
        // marginBottom: 70
        // top: 0,
        // left: 0
    },
    close_btn: {
        position: 'absolute',
        top: -5,
        right: -5,
        width: 40,
        height: 40,
        zIndex: 99,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fab816'
    },
    mod_day_time: {
        color: '#F4F7FF',
        paddingRight: 10,
        paddingTop: 5,
        textTransform: 'uppercase',
        // fontWeight: '700',
        fontSize: 15,
        textAlign: 'left',
        textAlign: 'center',
        alignSelf: 'center'
    },
    mod_weat_box: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'rgba(244, 247, 255, 0.25)',
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 30
    },
    mod_day_param: {
        margin: 5,
        borderRightColor: '#F4F7FF',
        borderRightWidth: 2,
        paddingRight: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
