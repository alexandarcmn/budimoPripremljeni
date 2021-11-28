import React, { forwardRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Tab = forwardRef(({item, onTabPress}, ref) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onTabPress}
        >
            <View ref={ref}>
                <Text style={styles.tab}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    )
});

const styles = StyleSheet.create({
    tab:{
        color: '#F4F7FF',
        fontWeight: '700',
        textTransform: 'uppercase',
        // paddingHorizontal: 5
    }
})

export default Tab;