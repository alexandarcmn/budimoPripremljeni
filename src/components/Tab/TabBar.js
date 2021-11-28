import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import Tab from './Tab2';
import Images from './images';

const { width, height } = Dimensions.get('screen')

const tabs = {
    home: 'Početna',
    weather: 'Prognoza',
    about: 'Info'
}

export default function TabBar({ state, navigation, navigateTo }) {

    const [selected, setSelected] = useState('home')
    const { routes } = state;
    // const filteredRoutes = routes.slice(0, 3);

    const switchTab = (currTab) => {
        setSelected(currTab)
        navigation.navigate(currTab)
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {
                    routes.map(route => {
                        return (
                            <Tab
                                key={route.key}
                                tab={route}
                                title={tabs[route.name]}
                                selected={selected === route.name ? true : false}
                                onPress={() => switchTab(route.name)}
                            />
                        )
                    })
                }
            </View>
            {/* <Text>tabbar</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 20,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: width - 40,
        borderRadius: 20,
        padding: 10,
        justifyContent: 'space-between',
    }
})
