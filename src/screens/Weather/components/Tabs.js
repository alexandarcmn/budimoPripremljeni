import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { measure } from 'react-native-reanimated';
import Indicator from './Indicator';
import Tab from './Tab';

const { width, height } = Dimensions.get('screen');

export default function Tabs({ scrollX, data, onTabPress }) {

    const [measures, setMeasures] = useState([]);
    const containerRef = useRef();

    useEffect(() => {
        const measure = [];
        data && data.forEach(item =>{
            return item.ref.current.measureLayout(containerRef.current, (x, y, width, height) =>{
                measure.push({
                    x, y, width, height
                })
                if(measure.length === data.length){
                    setMeasures(measure)
                }
            });
        })
    }, [])

    return (
        <View style={styles.wrapp}>
            <View 
                ref={containerRef}
                style={{justifyContent: 'space-evenly', width: width - 20, flexDirection: 'row'}}
            >
                {data.map((item, index) => {
                    return <Tab key={item.key} item={item} ref={item.ref} onTabPress={() => onTabPress(index)} />
                })}
            </View>
            { measures.length > 0 && <Indicator measures={measures} scrollX={scrollX} data={data} /> }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapp: {
        position: 'absolute',
        top: 20,
        width: width - 20,
        borderRadius: 10,
        backgroundColor: '#fab816',
        paddingVertical: 20,
        paddingHorizontal: 20,
        paddingLeft: 0
    }
})
