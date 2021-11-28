import * as React from 'react';
import {
    TouchableOpacity,
    Alert,
    StatusBar,
    Dimensions,
    Animated,
    FlatList,
    Text,
    View,
    StyleSheet,
    Image
} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

const data = [
    {
        key: 'cahp1',
        icon: 'whatshot',
        name: 'Požari',
    },
    {
        key: 'cahp2',
        icon: 'waves',
        name: 'Poplave',
    },
    {
        key: 'cahp3',
        icon: 'terrain',
        name: 'Geološki hazardi',
    },
    {
        key: 'cahp4',
        icon: 'bolt',
        name: 'Ekstremni vremenski uslovi',
    },
    {
        key: 'cahp5',
        icon: 'biotech',
        name: 'Biloški hazardi (epidemije)',
    },
    {
        key: 'cahp6',
        icon: 'landscape',
        name: 'Postupanje prilikom odlaska u planinu',
    },
    {
        key: 'cahp7',
        icon: 'support',
        name: 'Tehničko-tehnološke i druge nesreće',
    },
    {
        key: 'cahp8',
        icon: 'file-copy',
        name: 'Sendai okvir',
    },
    {
        key: 'cahp9',
        icon: 'settings',
        name: 'Mehanizam za civilnu zaštitu EU',
    },
    {
        key: 'cahp10',
        icon: 'gavel',
        name: 'Generalni direktorat za Evropsku civilnu zaštitu i aktivnosti humanitarne pomoći Evropske komisije (DG ECHO)',
    },
    {
        key: 'cahp11',
        icon: 'fence',
        name: 'Sistem zaštite i spašavanja u CG',
    },
    {
        key: 'cahp12',
        icon: 'timeline',
        name: 'Vanredno stanje u CG',
    },
    {
        key: 'cahp13',
        icon: 'lightbulb',
        name: 'Jeste li znali…',
    },
    {
        key: 'cahp14',
        icon: 'forum',
        name: 'Forum',
    },
    {
        icon: '',
        name: '',
    },
];
const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 3;
const colors = {
    yellow: '#39a7dd',
    dark: '#F4F7FF',
};

const { width, height } = Dimensions.get('window');

const Icon = React.memo(({ icon, color }) => {
    return <View><Icon2 name={icon} color={color} size={ICON_SIZE} /></View>
})

const Item = React.memo(({ icon, color, name, showText }) => {
    return (
        <View style={styles.itemWrapper}>
            {showText ? (
                <Text style={[styles.itemText, { color }]}>{name}</Text>
            ) : (
                // for spacing purposes
                <View style={{ backgroundColor: 'blue' }} />
            )}
            <Icon icon={icon} color={color} />
        </View>
    )
})

const ConnectWithText = React.memo(({titleIndex}) => {
    return (
        <View
            style={{
                position: 'absolute',
                top: height / 2 - ITEM_HEIGHT * 1.5,
                width: width * 0.7,
                paddingHorizontal: 14,
            }}
        >
            <Text
                style={{
                    color: colors.yellow,
                    fontSize: 30,
                    fontWeight: '700',
                    lineHeight: 30,
                }}
            >
                Informacije o smanjenju rizika od katastrofa
                {/* {data[titleIndex].name} */}
            </Text>
        </View>
    );
});

const ConnectButton = React.memo(({ onPress }) => {
    return (
        <View
            style={{
                position: 'absolute',
                top: height / 2 + ITEM_HEIGHT / 2,
                paddingHorizontal: 14,
            }}
        >
            <View
                style={{
                    height: ITEM_HEIGHT,
                    width: 4,
                    backgroundColor: colors.yellow,
                }}
            />
            <TouchableOpacity
                onPress={onPress}
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    backgroundColor: colors.yellow,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    borderTopRightRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                activeOpacity={0.8}
            >
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.dark, textTransform: 'uppercase' }}>
                    Detaljnije
                </Text>
            </TouchableOpacity>
        </View>
    );
});

const List = React.memo(
    React.forwardRef(
        ({ color, showText, style, onScroll, onItemIndexChange }, ref) => {
            return (
                <Animated.FlatList
                    ref={ref}
                    data={data}
                    style={style}
                    keyExtractor={(item) => `${item.name}-${item.icon}`}
                    bounces={false}
                    scrollEnabled={!showText}
                    scrollEventThrottle={16}
                    onScroll={onScroll}
                    decelerationRate='fast'
                    snapToInterval={ITEM_HEIGHT}
                    showsVerticalScrollIndicator={false}
                    renderToHardwareTextureAndroid
                    contentContainerStyle={{
                        paddingTop: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
                        paddingBottom: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
                        paddingHorizontal: 20,
                    }}
                    renderItem={({ item }) => {
                        return <Item {...item} color={color} showText={showText} />;
                    }}
                    onMomentumScrollEnd={(ev) => {
                        const newIndex = Math.round(
                            ev.nativeEvent.contentOffset.y / ITEM_HEIGHT
                        );

                        if (onItemIndexChange) {
                            onItemIndexChange(newIndex);
                        }
                    }}
                />
            );
        }
    )
);

export default function AboutScreen({ navigation }) {
    const [index, setIndex] = React.useState(0);
    const onConnectPress = React.useCallback(() => {
        navigation.navigate('chapterScreen', {
            chapter: data[index],
        })
    }, [index]);
    const yellowRef = React.useRef();
    const darkRef = React.useRef();
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
    );
    const onItemIndexChange = React.useCallback(setIndex, []);
    React.useEffect(() => {
        scrollY.addListener((v) => {
            if (darkRef?.current) {
                darkRef.current.scrollToOffset({
                    offset: v.value,
                    animated: false,
                });
            }
        });
    });

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <ConnectWithText titleIndex={index} />
            <View 
                style={{
                    backgroundColor: colors.dark, 
                    width: width, 
                    height: 100,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10
                }}
            >
                <Image
                    source={require('../../../assets/images/header.png')}
                    style={{transform:[{scale:0.04}]}}
                />
            </View>
            <List
                ref={yellowRef}
                color={colors.yellow}
                style={StyleSheet.absoluteFillObject}
                onScroll={onScroll}
                onItemIndexChange={onItemIndexChange}
            />
            <List
                ref={darkRef}
                color={colors.dark}
                showText
                style={{
                    position: 'absolute',
                    backgroundColor: colors.yellow,
                    width,
                    height: ITEM_HEIGHT,
                    top: height / 2 - ITEM_HEIGHT / 2,
                }}
            />
            <ConnectButton onPress={onConnectPress} />
            <Item />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight,
        backgroundColor: colors.dark,
        position: 'relative'
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    itemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: ITEM_HEIGHT,
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        width: width/1.5
    },
});