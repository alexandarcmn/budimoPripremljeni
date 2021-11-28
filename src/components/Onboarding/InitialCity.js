import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList, Image, Animated, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import setInitialCity from '../../../store/actions/onboarding_action';

const widnowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function InitialCity({ item }) {
    
    const dispatch = useDispatch();
    const [check, setCheck] = useState({
        id: '',
        checked: false
    })

    const handleCheck = (city) => {
        const { id, name } = city;

        if (check.id === '') {
            setCheck({
                id: id,
                checked: true
            })
            dispatch(setInitialCity({ cityID: id, cityName: name}));
        } else if (id === check.id) {
            setCheck({
                id: '',
                checked: false
            })
            dispatch(setInitialCity(''))
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headline}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={item.cities}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        padding: 20
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity 
                                style={styles.cityBox}
                                activeOpacity={1}
                                hitSlop={{ top: 0, left: 0, right: 0 }}
                                onPress={() => handleCheck(item)}
                            >
                                <Image
                                    source={{ uri: item.image }}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 60 / 2,
                                        marginRight: 10
                                    }}
                                />
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: '700',
                                            color: '#3555ae'
                                        }}
                                    >{item.name}</Text>
                                </View>
                                {
                                   check.id === item.id && check.checked ?
                                    <View style={styles.overlay}>
                                        <Image source={require('../../../assets/images/icons/check.png')} />
                                    </View>
                                    : null
                                }
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: widnowWidth - 40,
        height: windowHeight - 20,
        padding: 20
    },
    headline: {
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 10,
        color: '#fab816',
        textAlign: 'center'
    },
    description: {
        fontWeight: '300',
        color: '#F4F7FF',
        textAlign: 'center',
    },
    cityBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 15,
        position: 'relative'
    },
    overlay: {
        position: 'absolute',
        width: 60,
        height: 60,
        left: 10,
        borderRadius: 60 / 2,
        backgroundColor: 'rgba(9, 111, 180, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
