import React, { useCallback } from 'react'
import { StyleSheet, Text, View, StatusBar, Button, SafeAreaView, ScrollView, Dimensions, Image, FlatList, Linking } from 'react-native'
import data from './data';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default function ChapterScreen({ route, navigation }) {

    const { chapter } = route.params;
    const findData = data.find(el => el.id === chapter.key);

    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
            // Checking if the link is supported for links with custom URL scheme.
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);

        return <Button style={{ backgroundColor: '#39a7dd', borderRadius: 10 }} title={children} onPress={handlePress} />;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headTop}>
                <Image
                    source={require('../../../assets/images/header.png')}
                    style={{ width: width - 100, height: 60, resizeMode: 'contain' }}
                />
                <View style={styles.ChapIcon}>
                    <Icon name={chapter.icon} color="#ffffff" size={30} />
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <Image
                    source={require('../../../assets/images/fors.png')}
                    style={{ width: 75, height: 75, resizeMode: 'contain' }}
                />
                <Image
                    source={require('../../../assets/images/mupsrb.png')}
                    style={{ width: 75, height: 75, resizeMode: 'contain' }}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.chapHeadline}>{chapter.name}</Text>
            </View>
            <ScrollView style={styles.textScrollView}>
                {
                    chapter.key === 'cahp14' ?
                        <View>
                            <OpenURLButton url="http://www.meteo.co.me/forumi/">http://www.meteo.co.me/forumi/</OpenURLButton>
                        </View>
                        :
                        findData && findData.boxes.map((box, idx) => {
                            const { head, desc, ul } = box;
                            return (
                                <View key={idx}>
                                    {head ? <Text style={styles.chapHeadline2}>{head}</Text> : null}
                                    {desc ? <Text style={styles.chapDesc}>{desc}</Text> : null}
                                    {
                                        ul ?
                                            ul.map((list, li_idx) => {
                                                return (
                                                    <View key={li_idx}>
                                                        {list.title ? <Text style={styles.chapUlTitle}>{list.title}</Text> : null}
                                                        {list.desc ? <Text style={styles.chapUlDesc}>{list.desc}</Text> : null}
                                                        <FlatList
                                                            data={list.list}
                                                            renderItem={({ item }) => <View style={{ flexDirection: 'row' }}>
                                                                <Text style={{ color: '#3555ae', fontSize: 20, paddingRight: 5 }}>{'\u2022'}</Text>
                                                                <Text style={styles.chapLi}>{item}</Text>
                                                            </View>}
                                                        />
                                                        {list.desc2 ? <Text style={styles.chapUlDesc}>{list.desc2}</Text> : null}
                                                        {
                                                            list.img &&
                                                            list.img.map((boxImg, idx) => {
                                                                return (
                                                                    <View key={idx} style={{ marginBottom: 10 }}>
                                                                        <Image
                                                                            style={{
                                                                                width: null,
                                                                                resizeMode: 'contain',
                                                                                height: 220
                                                                            }}
                                                                            source={boxImg}
                                                                        />
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                        {/* {
                                                            box.img &&
                                                            box.img.map((boxImg, idx) => {
                                                                console.log('111111111111', boxImg);
                                                                return (
                                                                    <View key={idx}>
                                                                        <Image
                                                                            style={{width}}
                                                                            source={boxImg}
                                                                        />
                                                                    </View>
                                                                )
                                                            })
                                                        } */}
                                                    </View>
                                                )
                                            })
                                            : null
                                    }
                                </View>
                            )
                        })
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#f0efef'
    },
    headTop: {
        height: 80,
        width,
        backgroundColor: '#fab816',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    ChapIcon: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#fab816',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chapHeadline: {
        marginBottom: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fab816'
    },
    textScrollView: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    chapHeadline2: {
        color: '#3555ae',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    chapDesc: {
        color: '#A9A9A9',
        fontSize: 16,
        marginVertical: 10,
    },
    chapUlTitle: {
        color: '#3555ae',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    chapUlDesc: {
        color: '#A9A9A9',
        fontSize: 16,
        marginVertical: 10,
    },
    chapLi: {
        color: '#A9A9A9',
        fontSize: 16,
    },
})
