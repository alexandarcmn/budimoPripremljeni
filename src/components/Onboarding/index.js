import React, { useState, useRef} from 'react'
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native'

import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';
import NextButton from './NextButton';
import { useSelector } from 'react-redux';

const slides = [
    {
        id: '1',
        title: 'O Aplikaciji',
        description: "Mobilna aplikacija je izrađena u cilju podizanja nivoa svijesti javnosti o rizicima od nepogoda, preventivnim mjerama i aktivnostima koje treba preduzeti u slučaju nepogoda. Izradu aplikacije finansira Evropska unija kroz IPA Program prekogranične saradnje Srbija – Crna Gora 2014-2020, a u Crnoj Gori sufinansira Ministarstvo javne uprave, digitalnog društva i medija.",
        image: require('../../../assets/animations/about.json')
    },
    {
        id: '2',
        title: 'Izaberite Vas Grad',
        description: "",
        cities: [
            { 
                id: 1,
                name: 'Ada Bojana', 
                id: 'ADB', 
                image: 'https://www.vijesti.me/data/images/2020/11/24/18/5271757_1858994_ls.jpg' 
            },
            { 
                id: 2,
                name: 'Andrijevica', 
                id: 'AND', 
                image: 'https://m.cdm.me/wp-content/uploads/2018/09/andrijevica.jpg' 
            },
            { 
                id: 3,
                name: 'Bar', 
                id: 'BAR', 
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Bar-Montenegro-2018.jpg/800px-Bar-Montenegro-2018.jpg' 
            },
            { 
                id: 4,
                name: 'Berane', 
                id: 'BER', 
                image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Berane_2.jpg' 
            },
            { 
                id: 5,
                name: 'Bijelo Polje', 
                id: 'BIJ',
                image: 'https://waytomonte.com/img/slider/6/1/5591/58b43245202e85001dc4864ee3f4a1e2_thumb.jpg'
            },
            { 
                id: 6,
                name: 'Budva', 
                id: 'BUD',
                image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Budva_-_panoramio.jpg' 
            },
            { 
                id: 7,
                name: 'Cetinje', 
                id: 'CET',
                image: 'https://www.vijesti.me/data/images/2020/03/08/00/5038619_2020030818030_f04caedc73d5981a620a1253c3bb14da001a6dd4dc32615b78dbb2f2e903f3b0_ls.jpg' 
            },
            { 
                id: 8,
                name: 'Danilovgrad', 
                id: 'DAN',
                image: 'https://www.montenegro.com/w_2000//images/uploads/montenegro/bijela/AdobeStock_355239515%20(2).jpg' 
            },
            { 
                id: 9,
                name: 'Gusinje', 
                id: 'GUS',
                image: 'http://www.caffemontenegro.me/images/slider/caffe_162/gusinje_kika/Gusinje---panorama-pogled-sa-Vezirove-brade-copy.jpg' 
            },
            { 
                id: 10,
                name: 'Herceg Novi', 
                id: 'HER',
                image: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Herceg_Novi_Sunset.JPG' 
            },
            { 
                id: 11,
                name: 'Kolašin', 
                id: 'KOL',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Kola%C5%A1in_Town_Center.jpg/1024px-Kola%C5%A1in_Town_Center.jpg' 
            },
            { 
                id: 12,
                name: 'Kotor', 
                id: 'KOT',
                image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/20090719_Crkva_Gospa_od_Zdravlja_Kotor_Bay_Montenegro.jpg' 
            },
            { 
                id: 13,
                name: 'Mojkovac', 
                id: 'MOJ',
                image: 'https://www.booking.me/userFiles/upload/images/Mojkovac,%20Crna%20Gora.jpg' 
            },
            { 
                id: 14,
                name: 'Nikšić', 
                id: 'NIK',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Niksic_-_Pogled_sa_Trebjese.JPG/250px-Niksic_-_Pogled_sa_Trebjese.JPG' 
            },
            { 
                id: 15,
                name: 'Petnjica', 
                id: 'PET',
                image: 'https://www.monitor.co.me/wp-content/uploads/2021/08/Petnjica1-1024x576.jpg' 
            },
            { 
                id: 16,
                name: 'Plav', 
                id: 'PLA',
                image: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Plav.jpg'
            },
            { 
                id: 17,
                name: 'Pljevlja', 
                id: 'PLJ',
                image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Gradpv.jpg'
            },
            { 
                id: 18,
                name: 'Plužine', 
                id: 'PLU',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Plu%C5%BEine_Piva_Lake.JPG/800px-Plu%C5%BEine_Piva_Lake.JPG'
            },
            { 
                id: 19,
                name: 'Podgorica', 
                id: 'POD', 
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/PodgoricaOverview.jpg/1200px-PodgoricaOverview.jpg' 
            },
            { 
                id: 20,
                name: 'Rožaje', 
                id: 'ROZ', 
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Ro_panorama.jpg/250px-Ro_panorama.jpg' 
            },
            { 
                id: 21,
                name: 'Šavnik', 
                id: 'SAV', 
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/%C5%A0avnik%2C_Montenegro_03.jpg/800px-%C5%A0avnik%2C_Montenegro_03.jpg' 
            },
            { 
                id: 22,
                name: 'Tivat', 
                id: 'TIV', 
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Tivat_%2825532951078%29.jpg/800px-Tivat_%2825532951078%29.jpg' 
            },
            { 
                id: 23,
                name: 'Tuzi', 
                id: 'TUZ', 
                image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Decic_Hill_and_Dinaric_Alps_Prokletije.jpg' 
            },
            { 
                id: 24,
                name: 'Ulcinj', 
                id: 'ULC', 
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Ulcinj%2C_Montenegro_-_Sept._2010.jpg/800px-Ulcinj%2C_Montenegro_-_Sept._2010.jpg' 
            },
            { 
                id: 25,
                name: 'Žabljak', 
                id: 'ZAB', 
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/%C5%BDabljak%2C_Montenegro_-_main_square.jpg/300px-%C5%BDabljak%2C_Montenegro_-_main_square.jpg' 
            },
        ]
    }
]

export default function Onboarding({ navigation }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const onboardingState = useSelector(state => state.onboarding_reducer);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;

    const scrollTo = () =>{
        if(currentIndex < slides.length - 1){
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        }else{
            if(onboardingState.initialCity !== ''){
                navigation.navigate('mainScreen')
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList 
                    data={slides} 
                    renderItem={({item}) => <OnboardingItem item={item} currentIndex={currentIndex}/>}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={item => item.id}
                    onScroll={
                        Animated.event([
                            { 
                                nativeEvent: { 
                                    contentOffset: { 
                                        x: scrollX 
                                    }
                                }
                            }
                        ], {
                            useNativeDriver: false
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>
            <Paginator data={slides} scrollX={scrollX} />
            <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});