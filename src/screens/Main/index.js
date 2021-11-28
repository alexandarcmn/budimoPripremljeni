import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tab from '../../components/Tab';

import HomeScreen from '../HomeScreen';
import AboutScreen from '../AboutScreen';
import WeatherScreen from '../Weather';
import TabBar from '../../components/Tab/TabBar';
// import CityWeather from '../CityWeather';

const TabStack = createBottomTabNavigator();

export default function index({ navigation }) {

    return (
        <TabStack.Navigator
            screenOptions={{
                headerShown: false
            }}
            tabBar={props => <TabBar {...props} navigateTo={navigation} />}
        >
            <TabStack.Screen
                name="home"
                component={HomeScreen}
            // options={{
            //     tabBarButton: (props) => <Tab label="home" title="Početna" {...props}/>
            // }}
            />
            <TabStack.Screen
                name="weather"
                component={WeatherScreen}
            // options={{
            //     tabBarButton: (props) => <Tab label="weather" title="Vrijeme" {...props}/>
            // }}
            />
            <TabStack.Screen
                name="about"
                component={AboutScreen}
            // options={{
            //     tabBarButton: (props) => <Tab label="about" title="Info" {...props}/>
            // }}
            />
            {/* <TabStack.Screen
                name="cityWeather"
                component={CityWeather}
            /> */}
        </TabStack.Navigator>
    )
}
