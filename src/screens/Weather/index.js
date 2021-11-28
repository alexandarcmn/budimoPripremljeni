import React, { createRef, useCallback, useRef } from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList, Animated, Image, findNodeHandle } from 'react-native'
import Tabs from './components/Tabs';
import Today from './components/page/Today';
import Tomorrow from './components/page/Tomorrow';
import Navy from './components/page/Navy';
import Cities from './components/page/Cities';

const tabs = [
    {
        key: 1,
        title: new Date().getDate()+1+'.'+(new Date().getMonth()+1)+'.'+new Date().getFullYear(),
        page: {
            type: 'today',
            image: require('../../../assets/images/prog.png'),
            description: 'Promjenljivo oblačno, na jugu sa dužim sunčanim intervalima. Ujutru, u kontinentalnim predjelima, umjeren do jak, a na primorju slab mraz. Vjetar slab do umjeren, promjenljivog smjera. Najviša dnevna temperatura vazduha od -2 do 10 stepeni.'
        },
        ref: createRef()
    },
    {
        key: 2,
        title: new Date().getDate()+2+'.'+(new Date().getMonth()+1)+'.'+new Date().getFullYear(),
        page: {
            type: 'tomorrow',
            image: require('../../../assets/images/prog.png'),
            description: 'Promjenljivo oblačno, na jugu sa dužim sunčanim intervalima. Ujutru, u kontinentalnim predjelima, umjeren do jak, a na primorju slab mraz. Vjetar slab do umjeren, promjenljivog smjera. Najviša dnevna temperatura vazduha od -2 do 10 stepeni.'
        },
        ref: createRef()
    },
    {
        key: 3,
        title: 'Pomorci',
        page: {
            type:'navy',
            image: require('../../../assets/images/navy.png'),
            description: 'UPOZORENJE: Danas ponegdje udari  W i NW vjetra, 25-35 čvorova. Tokom noći mjestimični udari uz obalu NE, a na otvorenom N i NW vjetra, 25-40 čvorova. More umjereno talasasto do talasasto.SINOPTIČKA SITUACIJA: Jadran je pod uticajem ciklona koji se sporo premješta  prema jugu i jugoistoku. PROGNOZA VREMENA ZA JUŽNI JADRAN ZA NAREDNA 24 ČASA:  Vjetar SW i W, u skretanju na  N i NE, a na otvorenom i NW, 8-20, mjestimično na udare od 25 do 40 čvorova. More u jačanju na 3-4. Vidljivost 10-20km. Promjenljivo oblačno, ponegdje kiša ili pljusak i grmljavina. Jutarnja temperatura vazduha od 11 do 13, najviša dnevna od 18 do 20 stepeni.'
        },
        ref: createRef()
    },
    {
        key: 4,
        title: 'Gradovi',
        page: {
            type: 'cities',
            cities: [
                { 
                    id: 1,
                    name: 'Ada Bojana', 
                    cityId: 'ADB', 
                    image: 'https://www.vijesti.me/data/images/2020/11/24/18/5271757_1858994_ls.jpg' 
                },
                { 
                    id: 2,
                    name: 'Andrijevica', 
                    cityId: 'AND', 
                    image: 'https://m.cdm.me/wp-content/uploads/2018/09/andrijevica.jpg' 
                },
                { 
                    id: 3,
                    name: 'Bar', 
                    cityId: 'BAR', 
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Bar-Montenegro-2018.jpg/800px-Bar-Montenegro-2018.jpg' 
                },
                { 
                    id: 4,
                    name: 'Berane', 
                    cityId: 'BER', 
                    image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Berane_2.jpg' 
                },
                { 
                    id: 5,
                    name: 'Bijelo Polje', 
                    cityId: 'BIJ',
                    image: 'https://waytomonte.com/img/slider/6/1/5591/58b43245202e85001dc4864ee3f4a1e2_thumb.jpg'
                },
                { 
                    id: 6,
                    name: 'Budva', 
                    cityId: 'BUD',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Budva_-_panoramio.jpg' 
                },
                { 
                    id: 7,
                    name: 'Cetinje', 
                    cityId: 'CET',
                    image: 'https://www.vijesti.me/data/images/2020/03/08/00/5038619_2020030818030_f04caedc73d5981a620a1253c3bb14da001a6dd4dc32615b78dbb2f2e903f3b0_ls.jpg' 
                },
                { 
                    id: 8,
                    name: 'Danilovgrad', 
                    cityId: 'DAN',
                    image: 'https://www.montenegro.com/w_2000//images/uploads/montenegro/bijela/AdobeStock_355239515%20(2).jpg' 
                },
                { 
                    id: 9,
                    name: 'Gusinje', 
                    cityId: 'GUS',
                    image: 'http://www.caffemontenegro.me/images/slider/caffe_162/gusinje_kika/Gusinje---panorama-pogled-sa-Vezirove-brade-copy.jpg' 
                },
                { 
                    id: 10,
                    name: 'Herceg Novi', 
                    cityId: 'HER',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Herceg_Novi_Sunset.JPG' 
                },
                { 
                    id: 11,
                    name: 'Kolašin', 
                    cityId: 'KOL',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Kola%C5%A1in_Town_Center.jpg/1024px-Kola%C5%A1in_Town_Center.jpg' 
                },
                { 
                    id: 12,
                    name: 'Kotor', 
                    cityId: 'KOT',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/20090719_Crkva_Gospa_od_Zdravlja_Kotor_Bay_Montenegro.jpg' 
                },
                { 
                    id: 13,
                    name: 'Mojkovac', 
                    cityId: 'MOJ',
                    image: 'https://www.booking.me/userFiles/upload/images/Mojkovac,%20Crna%20Gora.jpg' 
                },
                { 
                    id: 14,
                    name: 'Nikšić', 
                    cityId: 'NIK',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Niksic_-_Pogled_sa_Trebjese.JPG/250px-Niksic_-_Pogled_sa_Trebjese.JPG' 
                },
                { 
                    id: 15,
                    name: 'Petnjica', 
                    cityId: 'PET',
                    image: 'https://www.monitor.co.me/wp-content/uploads/2021/08/Petnjica1-1024x576.jpg' 
                },
                { 
                    id: 16,
                    name: 'Plav', 
                    cityId: 'PLA',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Plav.jpg'
                },
                { 
                    id: 17,
                    name: 'Pljevlja', 
                    cityId: 'PLJ',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Gradpv.jpg'
                },
                { 
                    id: 18,
                    name: 'Plužine', 
                    cityId: 'PLU',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Plu%C5%BEine_Piva_Lake.JPG/800px-Plu%C5%BEine_Piva_Lake.JPG'
                },
                { 
                    id: 19,
                    name: 'Podgorica', 
                    cityId: 'POD', 
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/PodgoricaOverview.jpg/1200px-PodgoricaOverview.jpg' 
                },
                { 
                    id: 20,
                    name: 'Rožaje', 
                    cityId: 'ROZ', 
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Ro_panorama.jpg/250px-Ro_panorama.jpg' 
                },
                { 
                    id: 21,
                    name: 'Šavnik', 
                    cityId: 'SAV', 
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/%C5%A0avnik%2C_Montenegro_03.jpg/800px-%C5%A0avnik%2C_Montenegro_03.jpg' 
                },
                { 
                    id: 22,
                    name: 'Tivat', 
                    cityId: 'TIV', 
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Tivat_%2825532951078%29.jpg/800px-Tivat_%2825532951078%29.jpg' 
                },
                { 
                    id: 23,
                    name: 'Tuzi', 
                    cityId: 'TUZ', 
                    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Decic_Hill_and_Dinaric_Alps_Prokletije.jpg' 
                },
                { 
                    id: 24,
                    name: 'Ulcinj', 
                    cityId: 'ULC', 
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Ulcinj%2C_Montenegro_-_Sept._2010.jpg/800px-Ulcinj%2C_Montenegro_-_Sept._2010.jpg' 
                },
                { 
                    id: 25,
                    name: 'Žabljak', 
                    cityId: 'ZAB', 
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/%C5%BDabljak%2C_Montenegro_-_main_square.jpg/300px-%C5%BDabljak%2C_Montenegro_-_main_square.jpg' 
                },
            ]
        },
        ref: createRef()
    }
]

const { width, height } = Dimensions.get('screen');

export default function WeatherScreen({navigation}) {

    const scrollX = useRef(new Animated.Value(0)).current;
    const ref = useRef();
    const onTabPress = useCallback(itemIndex =>{
        ref?.current?.scrollToOffset({
            offset: itemIndex * width
        })
    })

    const renderTabContent = (page) =>{
        switch (page.type) {
            case 'today':
                return <Today data={page}/>
            case 'tomorrow':
                return <Tomorrow data={page}/>
            case 'navy':
                return <Navy data={page}/>
            case 'cities':
                return <Cities data={page} navigation={navigation}/>
            default:
                return <Today data={page}/>
        }
    }

    return (
        <View style={styles.container}>
            <Animated.FlatList
                ref={ref}
                data={tabs}
                keyExtractor={item => item.key}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                onScroll={Animated.event(
                    [{nativeEvent: { contentOffset: { x: scrollX }}}],
                    { useNativeDriver: false }
                )}
                renderItem={({item}) =>{
                    return <View key={item.key} style={{width, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            {renderTabContent(item.page)}
                        </View> 
                }}
            />
            <Tabs scrollX={scrollX} data={tabs} onTabPress={onTabPress} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tab_wrapp:{
        backgroundColor: '#F4F7FF'
    }
})
