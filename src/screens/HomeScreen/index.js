import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, FlatList } from 'react-native'
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCities } from '../../../store/actions/city_actions';
import { getCurrDate } from '../../components/helpers/date';
import { SvgCss } from 'react-native-svg';

const { width, height } = Dimensions.get('screen');

const today = [
    {
        id: 1,
        city: 'Cetinje',
        temp: '10°C',
    },
    {
        id: 2,
        city: 'Kotor',
        temp: '30°C',
    },
    {
        id: 3,
        city: 'Budva',
        temp: '20°C',
    },
    {
        id: 4,
        city: 'Plav',
        temp: '3°C',
    },
    {
        id: 5,
        city: 'Berane',
        temp: '2°C',
    },
    {
        id: 6,
        city: 'Pljevlja',
        temp: '0°C',
    }
]

const cities = [
    { code: "ADB", name: "Ada Bojana" },
    { code: "AND", name: "Andrijevica" },
    { code: "BAR", name: "Bar" },
    { code: "BER", name: "Berane" },
    { code: "BIJ", name: "Bijelo Polje" },
    { code: "BUD", name: "Budva" },
    { code: "CET", name: "Cetinje" },
    { code: "DAN", name: "Danilovgrad" },
    { code: "GUS", name: "Gusinje" },
    { code: "HER", name: "Herceg Novi" },
    { code: "KOL", name: "Kolašin" },
    { code: "KOT", name: "Kotor" },
    { code: "MOJ", name: "Mojkovac" },
    { code: "NIK", name: "Nikšić" },
    { code: "PET", name: "Petnjica" },
    { code: "PLA", name: "Plav" },
    { code: "PLJ", name: "Pljevlja" },
    { code: "PLU", name: "Plužine" },
    { code: "POD", name: "Podgorica" },
    { code: "ROZ", name: "Rožaje" },
    { code: "SAV", name: "Šavnik" },
    { code: "TIV", name: "Tivat" },
    { code: "TUZ", name: "Tuzi" },
    { code: "ULC", name: "Ulcinj" },
    { code: "ZAB", name: "Žabljak" },
];

const cityWeather = [
    {
        town: "Ada Bojana",
        code: "ADB",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "15.2",
                tmax: "20.1",
                hourlyForecast: [
                    { hour: "00", symbol: "N/11.svg", RR: "0.0", RH: "82.", wind: "V/v1-135.svg" },
                    { hour: "03", symbol: "N/05.svg", RR: "1.2", RH: "84.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "1.5", RH: "75.", wind: "V/v1-045.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.9", RH: "71.", wind: "V/v0-000.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.3", RH: "70.", wind: "V/v1-315.svg" },
                    { hour: "15", symbol: "D/13.svg", RR: "1.2", RH: "87.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "1.7", RH: "85.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/01.svg", RR: "0.0", RH: "85.", wind: "V/v2-360.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "11.9",
                tmax: "19.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/01.svg", RR: "0.0", RH: "86.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/01.svg", RR: "0.0", RH: "78.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/01.svg", RR: "0.0", RH: "63.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/01.svg", RR: "0.0", RH: "53.", wind: "V/v2-045.svg" },
                    { hour: "12", symbol: "D/01.svg", RR: "0.0", RH: "62.", wind: "V/v2-315.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "68.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "68.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/02.svg", RR: "0.0", RH: "72.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "13.1",
                tmax: "18.7",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "75.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "71.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "60.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "52.", wind: "V/v2-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "57.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "64.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "65.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "64.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "13.7",
                tmax: "14.5",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "63.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "65.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "65.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "64.", wind: "V/v4-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "66.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "67.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "67.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.2", RH: "69.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "12.5",
                tmax: "16.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "70.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "69.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "63.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "64.", wind: "V/v4-045.svg" },
                    { hour: "12", symbol: "D/02.svg", RR: "0.0", RH: "66.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "69.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "70.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/01.svg", RR: "0.0", RH: "73.", wind: "V/v3-045.svg" },
                ],
            },
        ],
    },
    {
        town: "Andrijevica",
        code: "AND",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "2.8",
                tmax: "11.2",
                hourlyForecast: [
                    { hour: "00", symbol: "N/03.svg", RR: "0.0", RH: "85.", wind: "V/v1-135.svg" },
                    { hour: "03", symbol: "N/03.svg", RR: "0.0", RH: "84.", wind: "V/v0-000.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "2.7", RH: "92.", wind: "V/v0-000.svg" },
                    { hour: "09", symbol: "D/13.svg", RR: "2.6", RH: "78.", wind: "V/v1-225.svg" },
                    { hour: "12", symbol: "D/08.svg", RR: "3.8", RH: "98.", wind: "V/v1-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.4", RH: "100.", wind: "V/v1-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.6", RH: "99.", wind: "V/v1-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.2", RH: "98.", wind: "V/v1-045.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "0.7",
                tmax: "7.6",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.3", RH: "99.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "0.2", RH: "99.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "0.3", RH: "92.", wind: "V/v2-045.svg" },
                    { hour: "09", symbol: "D/03.svg", RR: "0.0", RH: "76.", wind: "V/v2-045.svg" },
                    { hour: "12", symbol: "D/03.svg", RR: "0.0", RH: "80.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "92.", wind: "V/v2-360.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "100.", wind: "V/v1-045.svg" },
                    { hour: "21", symbol: "N/05.svg", RR: "0.0", RH: "99.", wind: "V/v1-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "2.3",
                tmax: "8.3",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "99.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "94.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "82.", wind: "V/v1-045.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.4", RH: "75.", wind: "V/v2-045.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.3", RH: "81.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/05.svg", RR: "0.1", RH: "88.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.2", RH: "92.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "97.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "1.6",
                tmax: "3.9",
                hourlyForecast: [
                    { hour: "00", symbol: "N/16.svg", RR: "0.1", RH: "93.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/16.svg", RR: "0.1", RH: "93.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.1", RH: "80.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/16.svg", RR: "0.2", RH: "82.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.2", RH: "85.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.4", RH: "95.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/13.svg", RR: "1.7", RH: "97.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/16.svg", RR: "1.5", RH: "96.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "1.0",
                tmax: "6.6",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.2", RH: "98.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/05.svg", RR: "0.0", RH: "94.", wind: "V/v2-045.svg" },
                    { hour: "06", symbol: "D/05.svg", RR: "0.0", RH: "89.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.1", RH: "82.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "1.1", RH: "95.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.2", RH: "94.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.3", RH: "96.", wind: "V/v2-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.4", RH: "98.", wind: "V/v2-045.svg" },
                ],
            },
        ],
    },
    {
        town: "Bar",
        code: "BAR",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "14.3",
                tmax: "19.4",
                hourlyForecast: [
                    { hour: "00", symbol: "N/05.svg", RR: "0.0", RH: "78.", wind: "V/v2-090.svg" },
                    { hour: "03", symbol: "N/05.svg", RR: "0.9", RH: "85.", wind: "V/v0-000.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "1.6", RH: "86.", wind: "V/v0-000.svg" },
                    { hour: "09", symbol: "D/13.svg", RR: "1.3", RH: "79.", wind: "V/v1-315.svg" },
                    { hour: "12", symbol: "D/13.svg", RR: "1.3", RH: "77.", wind: "V/v1-360.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "2.8", RH: "81.", wind: "V/v1-315.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.5", RH: "79.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/03.svg", RR: "0.0", RH: "77.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "12.2",
                tmax: "18.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/01.svg", RR: "0.0", RH: "72.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/01.svg", RR: "0.0", RH: "68.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/01.svg", RR: "0.0", RH: "62.", wind: "V/v1-360.svg" },
                    { hour: "09", symbol: "D/01.svg", RR: "0.0", RH: "66.", wind: "V/v1-315.svg" },
                    { hour: "12", symbol: "D/01.svg", RR: "0.0", RH: "73.", wind: "V/v2-315.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "65.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "70.", wind: "V/v2-045.svg" },
                    { hour: "21", symbol: "N/03.svg", RR: "0.0", RH: "70.", wind: "V/v2-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "13.2",
                tmax: "16.5",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "69.", wind: "V/v2-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "68.", wind: "V/v2-045.svg" },
                    { hour: "06", symbol: "D/03.svg", RR: "0.0", RH: "57.", wind: "V/v2-090.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "58.", wind: "V/v1-090.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.1", RH: "65.", wind: "V/v1-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "64.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "66.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "65.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "13.6",
                tmax: "15.1",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "62.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "59.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "55.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "55.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.1", RH: "58.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.2", RH: "60.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "61.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.3", RH: "65.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "13.1",
                tmax: "17.7",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "66.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "65.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/01.svg", RR: "0.0", RH: "56.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "58.", wind: "V/v1-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "63.", wind: "V/v1-360.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "65.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "63.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "65.", wind: "V/v3-045.svg" },
                ],
            },
        ],
    },
    {
        town: "Berane",
        code: "BER",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "3.9",
                tmax: "10.4",
                hourlyForecast: [
                    { hour: "00", symbol: "N/03.svg", RR: "0.0", RH: "80.", wind: "V/v0-000.svg" },
                    { hour: "03", symbol: "N/01.svg", RR: "0.0", RH: "77.", wind: "V/v0-000.svg" },
                    { hour: "06", symbol: "D/08.svg", RR: "3.5", RH: "94.", wind: "V/v0-000.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "1.2", RH: "89.", wind: "V/v1-045.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "2.1", RH: "94.", wind: "V/v1-360.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.5", RH: "96.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.9", RH: "96.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.3", RH: "93.", wind: "V/v1-360.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "1.7",
                tmax: "9.5",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.2", RH: "93.", wind: "V/v1-360.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "93.", wind: "V/v1-360.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "88.", wind: "V/v1-360.svg" },
                    { hour: "09", symbol: "D/03.svg", RR: "0.0", RH: "72.", wind: "V/v2-360.svg" },
                    { hour: "12", symbol: "D/03.svg", RR: "0.1", RH: "79.", wind: "V/v2-360.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "88.", wind: "V/v2-360.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "90.", wind: "V/v1-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "92.", wind: "V/v0-000.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "2.7",
                tmax: "9.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "99.", wind: "V/v0-000.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "97.", wind: "V/v1-360.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "76.", wind: "V/v1-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.1", RH: "63.", wind: "V/v2-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.1", RH: "69.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.2", RH: "81.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.4", RH: "85.", wind: "V/v2-360.svg" },
                    { hour: "21", symbol: "N/10.svg", RR: "0.3", RH: "91.", wind: "V/v2-360.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "3.3",
                tmax: "5.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.1", RH: "88.", wind: "V/v2-360.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "87.", wind: "V/v3-360.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "71.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "74.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "75.", wind: "V/v3-360.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.1", RH: "85.", wind: "V/v3-360.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.7", RH: "90.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/10.svg", RR: "0.5", RH: "93.", wind: "V/v2-360.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "2.5",
                tmax: "9.0",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.2", RH: "96.", wind: "V/v2-360.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "93.", wind: "V/v2-360.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "80.", wind: "V/v2-360.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "76.", wind: "V/v2-360.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.8", RH: "90.", wind: "V/v2-360.svg" },
                    { hour: "15", symbol: "D/05.svg", RR: "0.1", RH: "91.", wind: "V/v2-360.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "92.", wind: "V/v2-360.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "95.", wind: "V/v2-360.svg" },
                ],
            },
        ],
    },
    {
        town: "Bijelo Polje",
        code: "BIJ",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "5.5",
                tmax: "12.2",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "87.", wind: "V/v1-090.svg" },
                    { hour: "03", symbol: "N/01.svg", RR: "0.0", RH: "85.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/13.svg", RR: "2.9", RH: "94.", wind: "V/v1-360.svg" },
                    { hour: "09", symbol: "D/13.svg", RR: "2.1", RH: "84.", wind: "V/v1-315.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.1", RH: "82.", wind: "V/v2-315.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.1", RH: "84.", wind: "V/v1-315.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "85.", wind: "V/v1-315.svg" },
                    { hour: "21", symbol: "N/05.svg", RR: "0.1", RH: "84.", wind: "V/v1-315.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "4.8",
                tmax: "10.9",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.1", RH: "84.", wind: "V/v1-315.svg" },
                    { hour: "03", symbol: "N/05.svg", RR: "0.1", RH: "83.", wind: "V/v1-315.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "71.", wind: "V/v1-360.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "67.", wind: "V/v2-360.svg" },
                    { hour: "12", symbol: "D/01.svg", RR: "0.0", RH: "70.", wind: "V/v1-360.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "88.", wind: "V/v1-315.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "84.", wind: "V/v0-000.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "83.", wind: "V/v0-000.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "4.6",
                tmax: "12.1",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "87.", wind: "V/v0-000.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "87.", wind: "V/v0-000.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "70.", wind: "V/v1-360.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "52.", wind: "V/v1-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "65.", wind: "V/v1-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.1", RH: "75.", wind: "V/v1-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "80.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "89.", wind: "V/v1-360.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "4.9",
                tmax: "8.3",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "80.", wind: "V/v1-360.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "80.", wind: "V/v1-360.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "62.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "64.", wind: "V/v2-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "71.", wind: "V/v2-360.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "76.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.2", RH: "81.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "81.", wind: "V/v1-360.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "5.4",
                tmax: "11.5",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "85.", wind: "V/v1-360.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "80.", wind: "V/v1-360.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "68.", wind: "V/v1-360.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "64.", wind: "V/v2-045.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.1", RH: "78.", wind: "V/v1-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.1", RH: "78.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "85.", wind: "V/v1-315.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "84.", wind: "V/v1-315.svg" },
                ],
            },
        ],
    },
    {
        town: "Budva",
        code: "BUD",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "15.9",
                tmax: "20.3",
                hourlyForecast: [
                    { hour: "00", symbol: "N/05.svg", RR: "0.0", RH: "85.", wind: "V/v2-135.svg" },
                    { hour: "03", symbol: "N/05.svg", RR: "0.5", RH: "85.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "80.", wind: "V/v0-000.svg" },
                    { hour: "09", symbol: "D/02.svg", RR: "0.0", RH: "78.", wind: "V/v0-000.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "75.", wind: "V/v0-000.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "72.", wind: "V/v1-315.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "73.", wind: "V/v1-315.svg" },
                    { hour: "21", symbol: "N/01.svg", RR: "0.0", RH: "77.", wind: "V/v1-045.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "15.9",
                tmax: "20.3",
                hourlyForecast: [
                    { hour: "00", symbol: "N/01.svg", RR: "0.0", RH: "69.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "71.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/01.svg", RR: "0.0", RH: "68.", wind: "V/v0-000.svg" },
                    { hour: "09", symbol: "D/01.svg", RR: "0.0", RH: "65.", wind: "V/v1-000.svg" },
                    { hour: "12", symbol: "D/02.svg", RR: "0.0", RH: "75.", wind: "V/v1-315.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "64.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "57.", wind: "V/v2-045.svg" },
                    { hour: "21", symbol: "N/02.svg", RR: "0.0", RH: "62.", wind: "V/v1-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "15.2",
                tmax: "16.6",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "67.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "59.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "62.", wind: "V/v1-090.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "66.", wind: "V/v1-315.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "70.", wind: "V/v1-360.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "62.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/02.svg", RR: "0.0", RH: "61.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "62.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "13.8",
                tmax: "15.1",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "62.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "61.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "58.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "60.", wind: "V/v4-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "59.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "60.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "60.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "62.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "14.0",
                tmax: "17.9",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "61.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "59.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "58.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "61.", wind: "V/v1-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "72.", wind: "V/v1-315.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "68.", wind: "V/v1-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "60.", wind: "V/v2-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "62.", wind: "V/v2-045.svg" },
                ],
            },
        ],
    },
    {
        town: "Cetinje",
        code: "CET",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "8.8",
                tmax: "11.7",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.0", RH: "99.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "2.2", RH: "100.", wind: "V/v1-135.svg" },
                    { hour: "06", symbol: "D/10.svg", RR: "0.9", RH: "89.", wind: "V/v1-135.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "1.6", RH: "86.", wind: "V/v1-090.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.3", RH: "87.", wind: "V/v1-090.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.1", RH: "86.", wind: "V/v1-315.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "77.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/01.svg", RR: "0.0", RH: "82.", wind: "V/v2-360.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "4.3",
                tmax: "15.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/01.svg", RR: "0.0", RH: "80.", wind: "V/v2-360.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "81.", wind: "V/v2-360.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "69.", wind: "V/v1-045.svg" },
                    { hour: "09", symbol: "D/01.svg", RR: "0.0", RH: "65.", wind: "V/v1-045.svg" },
                    { hour: "12", symbol: "D/01.svg", RR: "0.0", RH: "68.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "72.", wind: "V/v2-360.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "73.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "68.", wind: "V/v1-360.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "7.2",
                tmax: "13.5",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "69.", wind: "V/v1-360.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "66.", wind: "V/v1-360.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "61.", wind: "V/v1-090.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "60.", wind: "V/v1-135.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "60.", wind: "V/v1-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "75.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/01.svg", RR: "0.0", RH: "69.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/01.svg", RR: "0.0", RH: "67.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "6.0",
                tmax: "8.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "69.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "67.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "62.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "65.", wind: "V/v4-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "63.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "64.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "66.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "67.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "6.4",
                tmax: "13.0",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "68.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "67.", wind: "V/v3-360.svg" },
                    { hour: "06", symbol: "D/02.svg", RR: "0.0", RH: "66.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "70.", wind: "V/v1-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "69.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "73.", wind: "V/v2-360.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "66.", wind: "V/v2-360.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "73.", wind: "V/v2-360.svg" },
                ],
            },
        ],
    },
    {
        town: "Danilovgrad",
        code: "DAN",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "11.7",
                tmax: "15.5",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "92.", wind: "V/v1-315.svg" },
                    { hour: "03", symbol: "N/13.svg", RR: "1.2", RH: "91.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/13.svg", RR: "1.6", RH: "80.", wind: "V/v0-000.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "2.6", RH: "76.", wind: "V/v0-000.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.3", RH: "80.", wind: "V/v0-000.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "87.", wind: "V/v1-315.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "72.", wind: "V/v2-360.svg" },
                    { hour: "21", symbol: "N/01.svg", RR: "0.0", RH: "67.", wind: "V/v3-360.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "7.8",
                tmax: "18.3",
                hourlyForecast: [
                    { hour: "00", symbol: "N/01.svg", RR: "0.0", RH: "62.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/01.svg", RR: "0.0", RH: "61.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/03.svg", RR: "0.0", RH: "52.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/01.svg", RR: "0.0", RH: "49.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/01.svg", RR: "0.0", RH: "54.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "56.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "56.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "63.", wind: "V/v2-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "10.4",
                tmax: "17.5",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "64.", wind: "V/v2-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "62.", wind: "V/v2-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "48.", wind: "V/v1-360.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "55.", wind: "V/v1-180.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.2", RH: "57.", wind: "V/v1-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "58.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "53.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "52.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "10.5",
                tmax: "12.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "56.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "54.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "50.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "50.", wind: "V/v4-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "52.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "55.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "54.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "55.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "10.3",
                tmax: "15.6",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "55.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "58.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "53.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "53.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "56.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "55.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "55.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "57.", wind: "V/v4-045.svg" },
                ],
            },
        ],
    },
    {
        town: "Gusinje",
        code: "GUS",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "3.7",
                tmax: "11.0",
                hourlyForecast: [
                    { hour: "00", symbol: "N/05.svg", RR: "0.0", RH: "85.", wind: "V/v1-135.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "0.5", RH: "88.", wind: "V/v1-135.svg" },
                    { hour: "06", symbol: "D/06.svg", RR: "3.4", RH: "73.", wind: "V/v1-180.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.2", RH: "63.", wind: "V/v1-180.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.1", RH: "69.", wind: "V/v1-135.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.2", RH: "94.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.1", RH: "90.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.2", RH: "91.", wind: "V/v1-360.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "-1.6",
                tmax: "8.0",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.2", RH: "93.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/03.svg", RR: "0.1", RH: "85.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/03.svg", RR: "0.0", RH: "75.", wind: "V/v2-360.svg" },
                    { hour: "09", symbol: "D/01.svg", RR: "0.0", RH: "73.", wind: "V/v2-360.svg" },
                    { hour: "12", symbol: "D/03.svg", RR: "0.0", RH: "81.", wind: "V/v2-360.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "96.", wind: "V/v2-360.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "92.", wind: "V/v1-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "93.", wind: "V/v1-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "1.5",
                tmax: "8.1",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "91.", wind: "V/v1-090.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "88.", wind: "V/v1-090.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "66.", wind: "V/v1-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.1", RH: "62.", wind: "V/v1-360.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.3", RH: "72.", wind: "V/v1-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.3", RH: "87.", wind: "V/v1-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.1", RH: "84.", wind: "V/v2-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "84.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "1.8",
                tmax: "4.0",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "84.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/16.svg", RR: "0.1", RH: "79.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/16.svg", RR: "0.2", RH: "73.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/16.svg", RR: "0.3", RH: "71.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/16.svg", RR: "0.2", RH: "76.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.3", RH: "81.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.9", RH: "85.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "1.1", RH: "89.", wind: "V/v2-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "-0.4",
                tmax: "8.9",
                hourlyForecast: [
                    { hour: "00", symbol: "N/05.svg", RR: "0.2", RH: "94.", wind: "V/v2-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "86.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.1", RH: "83.", wind: "V/v1-360.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "74.", wind: "V/v2-360.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.2", RH: "82.", wind: "V/v2-360.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.2", RH: "91.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.2", RH: "90.", wind: "V/v1-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.1", RH: "90.", wind: "V/v1-045.svg" },
                ],
            },
        ],
    },
    {
        town: "Herceg Novi",
        code: "HER",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "16.0",
                tmax: "21.1",
                hourlyForecast: [
                    { hour: "00", symbol: "N/05.svg", RR: "0.0", RH: "83.", wind: "V/v1-090.svg" },
                    { hour: "03", symbol: "N/05.svg", RR: "1.2", RH: "79.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.1", RH: "80.", wind: "V/v0-000.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.1", RH: "74.", wind: "V/v0-000.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "74.", wind: "V/v0-000.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "73.", wind: "V/v1-315.svg" },
                    { hour: "18", symbol: "N/03.svg", RR: "0.0", RH: "76.", wind: "V/v1-045.svg" },
                    { hour: "21", symbol: "N/01.svg", RR: "0.0", RH: "64.", wind: "V/v2-045.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "14.8",
                tmax: "20.9",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "63.", wind: "V/v2-360.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "63.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/01.svg", RR: "0.0", RH: "54.", wind: "V/v1-045.svg" },
                    { hour: "09", symbol: "D/01.svg", RR: "0.0", RH: "69.", wind: "V/v1-045.svg" },
                    { hour: "12", symbol: "D/03.svg", RR: "0.0", RH: "81.", wind: "V/v0-000.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "56.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "57.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "61.", wind: "V/v1-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "14.9",
                tmax: "16.2",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "64.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.1", RH: "62.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "0.4", RH: "77.", wind: "V/v0-000.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "1.4", RH: "81.", wind: "V/v0-000.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "1.4", RH: "77.", wind: "V/v1-360.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.1", RH: "63.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/02.svg", RR: "0.0", RH: "61.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/01.svg", RR: "0.0", RH: "60.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "13.4",
                tmax: "20.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/01.svg", RR: "0.0", RH: "61.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/03.svg", RR: "0.0", RH: "61.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "53.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "54.", wind: "V/v4-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "56.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "56.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "56.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "59.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "14.7",
                tmax: "17.9",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "59.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/03.svg", RR: "0.0", RH: "62.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "62.", wind: "V/v3-360.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "67.", wind: "V/v1-360.svg" },
                    { hour: "12", symbol: "D/02.svg", RR: "0.0", RH: "77.", wind: "V/v0-000.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "65.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "64.", wind: "V/v3-360.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "66.", wind: "V/v3-045.svg" },
                ],
            },
        ],
    },
    {
        town: "Kolašin",
        code: "KOL",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "3.9",
                tmax: "10.0",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.0", RH: "87.", wind: "V/v1-090.svg" },
                    { hour: "03", symbol: "N/02.svg", RR: "0.0", RH: "85.", wind: "V/v1-090.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "1.2", RH: "97.", wind: "V/v1-090.svg" },
                    { hour: "09", symbol: "D/13.svg", RR: "1.9", RH: "85.", wind: "V/v1-225.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.8", RH: "86.", wind: "V/v0-000.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.4", RH: "90.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/10.svg", RR: "0.2", RH: "87.", wind: "V/v2-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.1", RH: "89.", wind: "V/v2-045.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "2.1",
                tmax: "9.3",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.1", RH: "88.", wind: "V/v2-045.svg" },
                    { hour: "03", symbol: "N/03.svg", RR: "0.1", RH: "87.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.1", RH: "79.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/03.svg", RR: "0.0", RH: "73.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/02.svg", RR: "0.0", RH: "77.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "83.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "86.", wind: "V/v2-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "90.", wind: "V/v2-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "3.1",
                tmax: "10.6",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "88.", wind: "V/v2-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "79.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "66.", wind: "V/v2-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "61.", wind: "V/v2-045.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.3", RH: "74.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.1", RH: "81.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.2", RH: "83.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/03.svg", RR: "0.2", RH: "84.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "2.4",
                tmax: "5.3",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.5", RH: "90.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "0.6", RH: "86.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "0.5", RH: "81.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.5", RH: "80.", wind: "V/v4-045.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.6", RH: "83.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/13.svg", RR: "1.1", RH: "87.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/10.svg", RR: "1.0", RH: "84.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/13.svg", RR: "1.2", RH: "86.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "3.2",
                tmax: "8.5",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.6", RH: "85.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "0.2", RH: "85.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "0.1", RH: "80.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.1", RH: "78.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.2", RH: "84.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.2", RH: "86.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.4", RH: "88.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.2", RH: "90.", wind: "V/v3-045.svg" },
                ],
            },
        ],
    },
    {
        town: "Kotor",
        code: "KOT",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "8.2",
                tmax: "13.3",
                hourlyForecast: [
                    { hour: "00", symbol: "N/05.svg", RR: "0.0", RH: "90.", wind: "V/v1-180.svg" },
                    { hour: "03", symbol: "N/05.svg", RR: "0.7", RH: "90.", wind: "V/v0-000.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "1.0", RH: "89.", wind: "V/v1-000.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.7", RH: "77.", wind: "V/v1-000.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.4", RH: "80.", wind: "V/v0-000.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.1", RH: "84.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "67.", wind: "V/v1-045.svg" },
                    { hour: "21", symbol: "N/01.svg", RR: "0.0", RH: "73.", wind: "V/v2-045.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "7.6",
                tmax: "16.6",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "68.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "68.", wind: "V/v2-045.svg" },
                    { hour: "06", symbol: "D/03.svg", RR: "0.0", RH: "60.", wind: "V/v0-000.svg" },
                    { hour: "09", symbol: "D/01.svg", RR: "0.0", RH: "69.", wind: "V/v1-000.svg" },
                    { hour: "12", symbol: "D/02.svg", RR: "0.0", RH: "80.", wind: "V/v0-000.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.1", RH: "61.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "57.", wind: "V/v2-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "58.", wind: "V/v1-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "9.6",
                tmax: "13.1",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "56.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "62.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "65.", wind: "V/v1-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "72.", wind: "V/v1-315.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.4", RH: "73.", wind: "V/v1-360.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "67.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "62.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/03.svg", RR: "0.0", RH: "62.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "8.2",
                tmax: "10.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "60.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "59.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "55.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "57.", wind: "V/v4-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "57.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "56.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.1", RH: "59.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.2", RH: "64.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "8.5",
                tmax: "17.0",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "59.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "60.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "58.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "62.", wind: "V/v1-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "77.", wind: "V/v1-315.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "62.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "63.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "65.", wind: "V/v3-045.svg" },
                ],
            },
        ],
    },
    {
        town: "Mojkovac",
        code: "MOJ",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "2.6",
                tmax: "9.1",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.0", RH: "97.", wind: "V/v0-000.svg" },
                    { hour: "03", symbol: "N/05.svg", RR: "0.1", RH: "97.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/13.svg", RR: "2.8", RH: "92.", wind: "V/v1-225.svg" },
                    { hour: "09", symbol: "D/13.svg", RR: "1.7", RH: "92.", wind: "V/v0-000.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "1.5", RH: "96.", wind: "V/v1-360.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.7", RH: "96.", wind: "V/v2-360.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "1.0", RH: "97.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.7", RH: "98.", wind: "V/v2-360.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "0.4",
                tmax: "6.6",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "1.1", RH: "97.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "0.8", RH: "96.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "0.2", RH: "89.", wind: "V/v2-360.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "86.", wind: "V/v2-360.svg" },
                    { hour: "12", symbol: "D/03.svg", RR: "0.1", RH: "83.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "95.", wind: "V/v2-360.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "97.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.1", RH: "99.", wind: "V/v1-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "2.4",
                tmax: "8.1",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.1", RH: "100.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "0.1", RH: "97.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "0.2", RH: "86.", wind: "V/v1-045.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.1", RH: "69.", wind: "V/v2-045.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.2", RH: "82.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.3", RH: "91.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.2", RH: "100.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.2", RH: "99.", wind: "V/v3-360.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "0.8",
                tmax: "3.0",
                hourlyForecast: [
                    { hour: "00", symbol: "N/16.svg", RR: "0.3", RH: "98.", wind: "V/v3-360.svg" },
                    { hour: "03", symbol: "N/16.svg", RR: "0.3", RH: "96.", wind: "V/v3-360.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "0.2", RH: "89.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.2", RH: "84.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/10.svg", RR: "0.6", RH: "95.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/13.svg", RR: "1.4", RH: "98.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/13.svg", RR: "2.4", RH: "99.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/13.svg", RR: "1.8", RH: "98.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "1.0",
                tmax: "5.9",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.9", RH: "99.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "0.2", RH: "98.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "0.3", RH: "94.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.1", RH: "89.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.3", RH: "93.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.3", RH: "99.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.4", RH: "99.", wind: "V/v3-360.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.5", RH: "99.", wind: "V/v3-360.svg" },
                ],
            },
        ],
    },
    {
        town: "Nikšić",
        code: "NIK",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "6.5",
                tmax: "12.0",
                hourlyForecast: [
                    { hour: "00", symbol: "N/08.svg", RR: "0.0", RH: "99.", wind: "V/v1-135.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "0.7", RH: "97.", wind: "V/v0-000.svg" },
                    { hour: "06", symbol: "D/05.svg", RR: "0.6", RH: "86.", wind: "V/v1-180.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.6", RH: "81.", wind: "V/v1-135.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.2", RH: "78.", wind: "V/v1-135.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.1", RH: "86.", wind: "V/v1-315.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "81.", wind: "V/v2-360.svg" },
                    { hour: "21", symbol: "N/03.svg", RR: "0.0", RH: "80.", wind: "V/v2-360.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "5.5",
                tmax: "14.0",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "73.", wind: "V/v2-045.svg" },
                    { hour: "03", symbol: "N/01.svg", RR: "0.0", RH: "69.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "59.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/01.svg", RR: "0.0", RH: "57.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/01.svg", RR: "0.0", RH: "62.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "64.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "64.", wind: "V/v2-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "74.", wind: "V/v1-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "5.9",
                tmax: "14.2",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "74.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "75.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "53.", wind: "V/v1-090.svg" },
                    { hour: "09", symbol: "D/10.svg", RR: "0.1", RH: "51.", wind: "V/v1-090.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.4", RH: "65.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "65.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/03.svg", RR: "0.0", RH: "65.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "63.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "5.0",
                tmax: "9.9",
                hourlyForecast: [
                    { hour: "00", symbol: "N/01.svg", RR: "0.0", RH: "64.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "62.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "55.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "60.", wind: "V/v4-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "61.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "60.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "59.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "58.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "7.7",
                tmax: "13.9",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.1", RH: "60.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/01.svg", RR: "0.0", RH: "63.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "59.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "60.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "66.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "63.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "62.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "64.", wind: "V/v3-045.svg" },
                ],
            },
        ],
    },
    {
        town: "Petnjica",
        code: "PET",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "4.3",
                tmax: "11.7",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "81.", wind: "V/v1-090.svg" },
                    { hour: "03", symbol: "N/03.svg", RR: "0.0", RH: "81.", wind: "V/v1-090.svg" },
                    { hour: "06", symbol: "D/10.svg", RR: "0.7", RH: "94.", wind: "V/v1-090.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "1.8", RH: "84.", wind: "V/v1-315.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "1.6", RH: "91.", wind: "V/v1-315.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.1", RH: "97.", wind: "V/v1-315.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.3", RH: "96.", wind: "V/v1-315.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.6", RH: "97.", wind: "V/v1-315.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "2.7",
                tmax: "9.5",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.5", RH: "97.", wind: "V/v1-315.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "0.2", RH: "95.", wind: "V/v1-315.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "90.", wind: "V/v1-315.svg" },
                    { hour: "09", symbol: "D/03.svg", RR: "0.0", RH: "75.", wind: "V/v2-315.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "73.", wind: "V/v2-360.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "84.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "89.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "91.", wind: "V/v0-000.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "3.1",
                tmax: "10.7",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "89.", wind: "V/v0-000.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "89.", wind: "V/v0-000.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "70.", wind: "V/v1-360.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "59.", wind: "V/v2-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.1", RH: "71.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.1", RH: "82.", wind: "V/v1-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.1", RH: "83.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "84.", wind: "V/v1-360.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "4.1",
                tmax: "6.5",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "82.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "78.", wind: "V/v2-360.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.1", RH: "72.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.2", RH: "76.", wind: "V/v2-045.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.2", RH: "77.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.3", RH: "84.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.5", RH: "84.", wind: "V/v2-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.2", RH: "85.", wind: "V/v1-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "2.8",
                tmax: "10.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/05.svg", RR: "0.2", RH: "86.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "85.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "72.", wind: "V/v1-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "69.", wind: "V/v1-045.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.2", RH: "83.", wind: "V/v1-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.2", RH: "86.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.2", RH: "91.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/05.svg", RR: "0.1", RH: "93.", wind: "V/v1-360.svg" },
                ],
            },
        ],
    },
    {
        town: "Plav",
        code: "PLA",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "3.1",
                tmax: "10.5",
                hourlyForecast: [
                    { hour: "00", symbol: "N/11.svg", RR: "0.0", RH: "84.", wind: "V/v1-135.svg" },
                    { hour: "03", symbol: "N/05.svg", RR: "0.3", RH: "84.", wind: "V/v1-135.svg" },
                    { hour: "06", symbol: "D/05.svg", RR: "0.5", RH: "74.", wind: "V/v1-180.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.8", RH: "72.", wind: "V/v1-180.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "78.", wind: "V/v1-180.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.8", RH: "97.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.3", RH: "99.", wind: "V/v1-315.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.1", RH: "98.", wind: "V/v1-360.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "0.1",
                tmax: "11.0",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "99.", wind: "V/v0-000.svg" },
                    { hour: "03", symbol: "N/03.svg", RR: "0.0", RH: "92.", wind: "V/v1-360.svg" },
                    { hour: "06", symbol: "D/01.svg", RR: "0.0", RH: "74.", wind: "V/v2-360.svg" },
                    { hour: "09", symbol: "D/01.svg", RR: "0.0", RH: "67.", wind: "V/v2-360.svg" },
                    { hour: "12", symbol: "D/03.svg", RR: "0.0", RH: "80.", wind: "V/v2-360.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "95.", wind: "V/v2-360.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "92.", wind: "V/v1-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "89.", wind: "V/v1-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "1.9",
                tmax: "8.4",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "86.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "77.", wind: "V/v0-000.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "57.", wind: "V/v1-360.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "58.", wind: "V/v1-360.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.2", RH: "73.", wind: "V/v1-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.1", RH: "79.", wind: "V/v1-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.1", RH: "81.", wind: "V/v2-045.svg" },
                    { hour: "21", symbol: "N/16.svg", RR: "0.0", RH: "81.", wind: "V/v2-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "2.3",
                tmax: "3.3",
                hourlyForecast: [
                    { hour: "00", symbol: "N/16.svg", RR: "0.1", RH: "81.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/16.svg", RR: "0.2", RH: "80.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/16.svg", RR: "0.4", RH: "77.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/16.svg", RR: "0.5", RH: "77.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/16.svg", RR: "0.3", RH: "79.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/10.svg", RR: "0.6", RH: "82.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "1.4", RH: "82.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.7", RH: "84.", wind: "V/v2-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "0.7",
                tmax: "10.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/05.svg", RR: "0.2", RH: "86.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "84.", wind: "V/v1-360.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.1", RH: "76.", wind: "V/v1-360.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "66.", wind: "V/v2-360.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.3", RH: "80.", wind: "V/v1-360.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.3", RH: "93.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "92.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "89.", wind: "V/v1-360.svg" },
                ],
            },
        ],
    },
    {
        town: "Pljevlja",
        code: "PLJ",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "3.5",
                tmax: "7.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/10.svg", RR: "0.0", RH: "94.", wind: "V/v0-000.svg" },
                    { hour: "03", symbol: "N/05.svg", RR: "0.2", RH: "93.", wind: "V/v1-360.svg" },
                    { hour: "06", symbol: "D/13.svg", RR: "1.4", RH: "95.", wind: "V/v1-315.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "2.3", RH: "90.", wind: "V/v1-315.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.1", RH: "88.", wind: "V/v1-360.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.2", RH: "93.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.1", RH: "92.", wind: "V/v1-315.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.2", RH: "94.", wind: "V/v1-315.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "3.1",
                tmax: "10.3",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.1", RH: "95.", wind: "V/v1-315.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.1", RH: "93.", wind: "V/v1-315.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.1", RH: "85.", wind: "V/v2-315.svg" },
                    { hour: "09", symbol: "D/02.svg", RR: "0.0", RH: "69.", wind: "V/v2-360.svg" },
                    { hour: "12", symbol: "D/01.svg", RR: "0.0", RH: "64.", wind: "V/v2-360.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "85.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "88.", wind: "V/v0-000.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "91.", wind: "V/v0-000.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "2.9",
                tmax: "8.9",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "94.", wind: "V/v0-000.svg" },
                    { hour: "03", symbol: "N/05.svg", RR: "0.0", RH: "93.", wind: "V/v0-000.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "64.", wind: "V/v1-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "68.", wind: "V/v2-360.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "73.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "90.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/03.svg", RR: "0.0", RH: "92.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.6", RH: "93.", wind: "V/v2-360.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "2.7",
                tmax: "6.6",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.4", RH: "92.", wind: "V/v1-360.svg" },
                    { hour: "03", symbol: "N/16.svg", RR: "0.0", RH: "89.", wind: "V/v1-360.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "76.", wind: "V/v2-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "71.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/10.svg", RR: "0.6", RH: "86.", wind: "V/v2-360.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "1.3", RH: "92.", wind: "V/v2-360.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.5", RH: "91.", wind: "V/v2-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.6", RH: "89.", wind: "V/v2-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "4.0",
                tmax: "7.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.5", RH: "90.", wind: "V/v2-045.svg" },
                    { hour: "03", symbol: "N/05.svg", RR: "0.2", RH: "90.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "0.2", RH: "83.", wind: "V/v2-045.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.1", RH: "80.", wind: "V/v2-045.svg" },
                    { hour: "12", symbol: "D/05.svg", RR: "0.1", RH: "82.", wind: "V/v2-360.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.1", RH: "92.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.2", RH: "94.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.3", RH: "95.", wind: "V/v1-360.svg" },
                ],
            },
        ],
    },
    {
        town: "Plužine",
        code: "PLU",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "1.2",
                tmax: "8.1",
                hourlyForecast: [
                    { hour: "00", symbol: "N/13.svg", RR: "0.0", RH: "94.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "0.9", RH: "93.", wind: "V/v1-360.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "1.1", RH: "92.", wind: "V/v0-000.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.3", RH: "84.", wind: "V/v1-360.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.4", RH: "88.", wind: "V/v2-360.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.6", RH: "94.", wind: "V/v2-360.svg" },
                    { hour: "18", symbol: "N/13.svg", RR: "1.0", RH: "94.", wind: "V/v3-360.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "1.2", RH: "93.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "1.6",
                tmax: "9.4",
                hourlyForecast: [
                    { hour: "00", symbol: "N/10.svg", RR: "0.5", RH: "94.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "0.3", RH: "89.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "0.6", RH: "81.", wind: "V/v3-360.svg" },
                    { hour: "09", symbol: "D/05.svg", RR: "0.1", RH: "68.", wind: "V/v3-360.svg" },
                    { hour: "12", symbol: "D/01.svg", RR: "0.0", RH: "69.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "77.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "84.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "91.", wind: "V/v2-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "2.7",
                tmax: "8.2",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "89.", wind: "V/v2-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "81.", wind: "V/v2-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "67.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "61.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "72.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "89.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/02.svg", RR: "0.1", RH: "95.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/05.svg", RR: "0.1", RH: "92.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "1.6",
                tmax: "5.9",
                hourlyForecast: [
                    { hour: "00", symbol: "N/05.svg", RR: "0.3", RH: "90.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/16.svg", RR: "0.2", RH: "83.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.1", RH: "66.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "72.", wind: "V/v4-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.1", RH: "80.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/10.svg", RR: "0.6", RH: "84.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.9", RH: "84.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/10.svg", RR: "0.8", RH: "84.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "3.5",
                tmax: "8.4",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "1.2", RH: "86.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "0.6", RH: "85.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "0.3", RH: "77.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.2", RH: "72.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.2", RH: "79.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.2", RH: "85.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.3", RH: "88.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.3", RH: "89.", wind: "V/v4-045.svg" },
                ],
            },
        ],
    },
    {
        town: "Podgorica",
        code: "POD",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "11.5",
                tmax: "15.9",
                hourlyForecast: [
                    { hour: "00", symbol: "N/13.svg", RR: "0.0", RH: "92.", wind: "V/v1-315.svg" },
                    { hour: "03", symbol: "N/13.svg", RR: "2.6", RH: "93.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "1.2", RH: "82.", wind: "V/v1-045.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "2.1", RH: "75.", wind: "V/v0-000.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.2", RH: "79.", wind: "V/v0-000.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.1", RH: "85.", wind: "V/v1-315.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "77.", wind: "V/v2-360.svg" },
                    { hour: "21", symbol: "N/01.svg", RR: "0.0", RH: "76.", wind: "V/v3-360.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "8.1",
                tmax: "20.5",
                hourlyForecast: [
                    { hour: "00", symbol: "N/02.svg", RR: "0.0", RH: "67.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/01.svg", RR: "0.0", RH: "63.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/01.svg", RR: "0.0", RH: "47.", wind: "V/v2-045.svg" },
                    { hour: "09", symbol: "D/01.svg", RR: "0.0", RH: "45.", wind: "V/v2-360.svg" },
                    { hour: "12", symbol: "D/01.svg", RR: "0.0", RH: "52.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "54.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "60.", wind: "V/v2-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "64.", wind: "V/v1-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "9.4",
                tmax: "17.3",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "70.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "67.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "55.", wind: "V/v1-180.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "49.", wind: "V/v1-180.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "59.", wind: "V/v0-000.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "62.", wind: "V/v1-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "49.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/02.svg", RR: "0.0", RH: "48.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "12.0",
                tmax: "14.2",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "50.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "49.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "46.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "46.", wind: "V/v4-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "47.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "47.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "48.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "50.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "12.0",
                tmax: "18.7",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "50.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "53.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "48.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "50.", wind: "V/v3-360.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "53.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "52.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "52.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "52.", wind: "V/v3-045.svg" },
                ],
            },
        ],
    },
    {
        town: "Rožaje",
        code: "ROZ",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "3.6",
                tmax: "9.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.0", RH: "92.", wind: "V/v2-090.svg" },
                    { hour: "03", symbol: "N/03.svg", RR: "0.1", RH: "90.", wind: "V/v1-090.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "0.4", RH: "84.", wind: "V/v0-000.svg" },
                    { hour: "09", symbol: "D/13.svg", RR: "1.9", RH: "90.", wind: "V/v1-360.svg" },
                    { hour: "12", symbol: "D/08.svg", RR: "3.3", RH: "94.", wind: "V/v1-315.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "2.1", RH: "100.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.3", RH: "99.", wind: "V/v1-315.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.6", RH: "97.", wind: "V/v1-315.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "1.8",
                tmax: "6.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.3", RH: "96.", wind: "V/v1-315.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.1", RH: "91.", wind: "V/v1-315.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "85.", wind: "V/v1-315.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.1", RH: "89.", wind: "V/v2-315.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "78.", wind: "V/v2-360.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.1", RH: "93.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "94.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "97.", wind: "V/v1-360.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "2.4",
                tmax: "8.1",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "97.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "93.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "77.", wind: "V/v1-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "66.", wind: "V/v2-045.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.3", RH: "84.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.5", RH: "96.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.2", RH: "97.", wind: "V/v1-045.svg" },
                    { hour: "21", symbol: "N/16.svg", RR: "0.0", RH: "97.", wind: "V/v1-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "1.3",
                tmax: "2.7",
                hourlyForecast: [
                    { hour: "00", symbol: "N/16.svg", RR: "0.1", RH: "97.", wind: "V/v2-045.svg" },
                    { hour: "03", symbol: "N/16.svg", RR: "0.2", RH: "96.", wind: "V/v2-045.svg" },
                    { hour: "06", symbol: "D/16.svg", RR: "0.3", RH: "85.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/16.svg", RR: "0.6", RH: "93.", wind: "V/v2-045.svg" },
                    { hour: "12", symbol: "D/16.svg", RR: "0.5", RH: "94.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.8", RH: "97.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/16.svg", RR: "1.4", RH: "99.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/16.svg", RR: "0.9", RH: "99.", wind: "V/v2-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "0.9",
                tmax: "5.4",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.2", RH: "99.", wind: "V/v2-045.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "0.3", RH: "98.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "0.2", RH: "94.", wind: "V/v1-090.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.1", RH: "92.", wind: "V/v1-090.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "1.0", RH: "96.", wind: "V/v1-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.9", RH: "98.", wind: "V/v1-090.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.5", RH: "95.", wind: "V/v1-090.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.1", RH: "94.", wind: "V/v1-360.svg" },
                ],
            },
        ],
    },
    {
        town: "Šavnik",
        code: "SAV",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "3.0",
                tmax: "8.6",
                hourlyForecast: [
                    { hour: "00", symbol: "N/05.svg", RR: "0.0", RH: "90.", wind: "V/v1-135.svg" },
                    { hour: "03", symbol: "N/13.svg", RR: "1.1", RH: "97.", wind: "V/v0-000.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "2.0", RH: "88.", wind: "V/v1-180.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "2.3", RH: "91.", wind: "V/v1-225.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "1.7", RH: "84.", wind: "V/v0-000.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.1", RH: "91.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.1", RH: "86.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/03.svg", RR: "0.0", RH: "87.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "0.2",
                tmax: "10.0",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "84.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "85.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "73.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/01.svg", RR: "0.0", RH: "71.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/01.svg", RR: "0.0", RH: "77.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "83.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "86.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "90.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "2.5",
                tmax: "7.3",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "87.", wind: "V/v2-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "81.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "76.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "65.", wind: "V/v2-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "75.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "88.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "78.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/03.svg", RR: "0.0", RH: "80.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "0.2",
                tmax: "4.0",
                hourlyForecast: [
                    { hour: "00", symbol: "N/01.svg", RR: "0.0", RH: "80.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/03.svg", RR: "0.0", RH: "78.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "67.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.2", RH: "78.", wind: "V/v4-045.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.8", RH: "81.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/10.svg", RR: "0.9", RH: "83.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.8", RH: "84.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.6", RH: "86.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "1.7",
                tmax: "6.7",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.7", RH: "87.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "0.4", RH: "86.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "0.2", RH: "81.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.2", RH: "78.", wind: "V/v4-045.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.2", RH: "83.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.1", RH: "84.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.1", RH: "86.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.2", RH: "87.", wind: "V/v4-045.svg" },
                ],
            },
        ],
    },
    {
        town: "Tivat",
        code: "TIV",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "10.7",
                tmax: "15.5",
                hourlyForecast: [
                    { hour: "00", symbol: "N/05.svg", RR: "0.0", RH: "84.", wind: "V/v1-135.svg" },
                    { hour: "03", symbol: "N/05.svg", RR: "0.7", RH: "82.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "79.", wind: "V/v0-000.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "66.", wind: "V/v0-000.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "66.", wind: "V/v0-000.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "65.", wind: "V/v1-315.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "76.", wind: "V/v1-045.svg" },
                    { hour: "21", symbol: "N/01.svg", RR: "0.0", RH: "70.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "11.5",
                tmax: "19.3",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "67.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "62.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/01.svg", RR: "0.0", RH: "51.", wind: "V/v1-045.svg" },
                    { hour: "09", symbol: "D/01.svg", RR: "0.0", RH: "60.", wind: "V/v1-045.svg" },
                    { hour: "12", symbol: "D/03.svg", RR: "0.0", RH: "72.", wind: "V/v0-000.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "57.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "65.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "65.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "12.8",
                tmax: "16.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "68.", wind: "V/v2-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "63.", wind: "V/v2-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "57.", wind: "V/v0-000.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "62.", wind: "V/v1-360.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "63.", wind: "V/v1-360.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "62.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "55.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "53.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "12.1",
                tmax: "14.9",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "54.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "53.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "46.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "47.", wind: "V/v4-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "49.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "48.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "48.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "53.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "13.0",
                tmax: "18.6",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "53.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "56.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "54.", wind: "V/v3-360.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "60.", wind: "V/v1-360.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "70.", wind: "V/v1-360.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "57.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "57.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/01.svg", RR: "0.0", RH: "58.", wind: "V/v3-045.svg" },
                ],
            },
        ],
    },
    {
        town: "Tuzi",
        code: "TUZ",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "11.9",
                tmax: "16.1",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.0", RH: "91.", wind: "V/v1-315.svg" },
                    { hour: "03", symbol: "N/13.svg", RR: "2.2", RH: "92.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/13.svg", RR: "1.4", RH: "82.", wind: "V/v1-045.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "2.3", RH: "73.", wind: "V/v0-000.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.4", RH: "77.", wind: "V/v0-000.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.1", RH: "84.", wind: "V/v1-315.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "83.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/01.svg", RR: "0.0", RH: "78.", wind: "V/v2-045.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "8.4",
                tmax: "21.0",
                hourlyForecast: [
                    { hour: "00", symbol: "N/02.svg", RR: "0.0", RH: "67.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/01.svg", RR: "0.0", RH: "66.", wind: "V/v2-045.svg" },
                    { hour: "06", symbol: "D/01.svg", RR: "0.0", RH: "49.", wind: "V/v1-045.svg" },
                    { hour: "09", symbol: "D/01.svg", RR: "0.0", RH: "47.", wind: "V/v1-045.svg" },
                    { hour: "12", symbol: "D/01.svg", RR: "0.0", RH: "50.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "58.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "60.", wind: "V/v2-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "63.", wind: "V/v1-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "9.5",
                tmax: "17.0",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "68.", wind: "V/v1-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "63.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "62.", wind: "V/v1-180.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "52.", wind: "V/v1-180.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "56.", wind: "V/v1-225.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "63.", wind: "V/v1-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "49.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "49.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "12.3",
                tmax: "14.3",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "50.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "49.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "46.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "47.", wind: "V/v4-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "46.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "46.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "47.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "50.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "11.9",
                tmax: "19.2",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "50.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "51.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "46.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "49.", wind: "V/v1-360.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "50.", wind: "V/v2-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "52.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "50.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "52.", wind: "V/v3-045.svg" },
                ],
            },
        ],
    },
    {
        town: "Ulcinj",
        code: "ULC",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "14.9",
                tmax: "18.6",
                hourlyForecast: [
                    { hour: "00", symbol: "N/05.svg", RR: "0.0", RH: "85.", wind: "V/v1-090.svg" },
                    { hour: "03", symbol: "N/05.svg", RR: "0.4", RH: "88.", wind: "V/v1-045.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "1.2", RH: "77.", wind: "V/v0-000.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.6", RH: "72.", wind: "V/v0-000.svg" },
                    { hour: "12", symbol: "D/10.svg", RR: "0.1", RH: "71.", wind: "V/v0-000.svg" },
                    { hour: "15", symbol: "D/10.svg", RR: "0.8", RH: "84.", wind: "V/v1-360.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "1.3", RH: "81.", wind: "V/v1-360.svg" },
                    { hour: "21", symbol: "N/01.svg", RR: "0.0", RH: "77.", wind: "V/v1-360.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "11.7",
                tmax: "18.8",
                hourlyForecast: [
                    { hour: "00", symbol: "N/01.svg", RR: "0.0", RH: "78.", wind: "V/v2-045.svg" },
                    { hour: "03", symbol: "N/01.svg", RR: "0.0", RH: "77.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/01.svg", RR: "0.0", RH: "63.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/01.svg", RR: "0.0", RH: "54.", wind: "V/v1-360.svg" },
                    { hour: "12", symbol: "D/01.svg", RR: "0.0", RH: "64.", wind: "V/v2-315.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "71.", wind: "V/v1-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "70.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/03.svg", RR: "0.0", RH: "74.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "12.7",
                tmax: "18.3",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "75.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "72.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "59.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "51.", wind: "V/v3-090.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "56.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "65.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "64.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/04.svg", RR: "0.0", RH: "63.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "13.4",
                tmax: "14.3",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "64.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "63.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "63.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "62.", wind: "V/v4-045.svg" },
                    { hour: "12", symbol: "D/04.svg", RR: "0.0", RH: "66.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "65.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/10.svg", RR: "0.0", RH: "68.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.2", RH: "70.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "12.3",
                tmax: "17.0",
                hourlyForecast: [
                    { hour: "00", symbol: "N/04.svg", RR: "0.0", RH: "70.", wind: "V/v4-045.svg" },
                    { hour: "03", symbol: "N/04.svg", RR: "0.0", RH: "69.", wind: "V/v4-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "62.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "63.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/01.svg", RR: "0.0", RH: "66.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "69.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/04.svg", RR: "0.0", RH: "69.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/03.svg", RR: "0.0", RH: "70.", wind: "V/v3-045.svg" },
                ],
            },
        ],
    },
    {
        town: "Žabljak",
        code: "ZAB",
        forecast: [
            {
                date: "2021-10-11",
                tmin: "0.1",
                tmax: "6.7",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.0", RH: "100.", wind: "V/v1-135.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "0.3", RH: "95.", wind: "V/v1-090.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "2.8", RH: "89.", wind: "V/v1-180.svg" },
                    { hour: "09", symbol: "D/13.svg", RR: "1.1", RH: "91.", wind: "V/v1-090.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.9", RH: "96.", wind: "V/v1-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.5", RH: "98.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.4", RH: "98.", wind: "V/v2-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "1.0", RH: "98.", wind: "V/v2-045.svg" },
                ],
            },
            {
                date: "2021-10-12",
                tmin: "-0.3",
                tmax: "5.4",
                hourlyForecast: [
                    { hour: "00", symbol: "N/07.svg", RR: "0.6", RH: "98.", wind: "V/v2-045.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "0.3", RH: "95.", wind: "V/v2-045.svg" },
                    { hour: "06", symbol: "D/04.svg", RR: "0.0", RH: "84.", wind: "V/v3-360.svg" },
                    { hour: "09", symbol: "D/05.svg", RR: "0.0", RH: "80.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/02.svg", RR: "0.0", RH: "84.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/04.svg", RR: "0.0", RH: "97.", wind: "V/v2-045.svg" },
                    { hour: "18", symbol: "N/16.svg", RR: "0.0", RH: "98.", wind: "V/v2-045.svg" },
                    { hour: "21", symbol: "N/16.svg", RR: "0.3", RH: "98.", wind: "V/v2-045.svg" },
                ],
            },
            {
                date: "2021-10-13",
                tmin: "0.3",
                tmax: "4.1",
                hourlyForecast: [
                    { hour: "00", symbol: "N/16.svg", RR: "0.3", RH: "98.", wind: "V/v2-045.svg" },
                    { hour: "03", symbol: "N/16.svg", RR: "0.5", RH: "96.", wind: "V/v2-045.svg" },
                    { hour: "06", symbol: "D/16.svg", RR: "0.3", RH: "94.", wind: "V/v2-045.svg" },
                    { hour: "09", symbol: "D/04.svg", RR: "0.0", RH: "76.", wind: "V/v2-045.svg" },
                    { hour: "12", symbol: "D/16.svg", RR: "0.0", RH: "90.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/16.svg", RR: "0.1", RH: "99.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/16.svg", RR: "0.2", RH: "98.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/16.svg", RR: "0.9", RH: "99.", wind: "V/v3-045.svg" },
                ],
            },
            {
                date: "2021-10-14",
                tmin: "-1.7",
                tmax: "0.6",
                hourlyForecast: [
                    { hour: "00", symbol: "N/16.svg", RR: "0.9", RH: "99.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/16.svg", RR: "0.4", RH: "98.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/16.svg", RR: "0.1", RH: "88.", wind: "V/v4-045.svg" },
                    { hour: "09", symbol: "D/16.svg", RR: "0.0", RH: "94.", wind: "V/v4-045.svg" },
                    { hour: "12", symbol: "D/16.svg", RR: "0.9", RH: "98.", wind: "V/v4-045.svg" },
                    { hour: "15", symbol: "D/16.svg", RR: "1.2", RH: "100.", wind: "V/v4-045.svg" },
                    { hour: "18", symbol: "N/16.svg", RR: "1.1", RH: "100.", wind: "V/v4-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "1.0", RH: "99.", wind: "V/v4-045.svg" },
                ],
            },
            {
                date: "2021-10-15",
                tmin: "-0.3",
                tmax: "3.0",
                hourlyForecast: [
                    { hour: "00", symbol: "N/16.svg", RR: "1.2", RH: "99.", wind: "V/v3-045.svg" },
                    { hour: "03", symbol: "N/07.svg", RR: "0.4", RH: "97.", wind: "V/v3-045.svg" },
                    { hour: "06", symbol: "D/07.svg", RR: "0.3", RH: "94.", wind: "V/v3-045.svg" },
                    { hour: "09", symbol: "D/07.svg", RR: "0.3", RH: "94.", wind: "V/v3-045.svg" },
                    { hour: "12", symbol: "D/07.svg", RR: "0.6", RH: "97.", wind: "V/v3-045.svg" },
                    { hour: "15", symbol: "D/07.svg", RR: "0.8", RH: "99.", wind: "V/v3-045.svg" },
                    { hour: "18", symbol: "N/07.svg", RR: "0.7", RH: "99.", wind: "V/v3-045.svg" },
                    { hour: "21", symbol: "N/07.svg", RR: "0.6", RH: "99.", wind: "V/v3-045.svg" },
                ],
            },
        ],
    },
];


export default function HomeScreen() {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const onboardingState = useSelector(state => state.onboarding_reducer);
    const [mainCity, setMainCity] = useState();
    const [allCities, setAllCities] = useState();

    const date = getCurrDate(false);

    const fetchData = async () => {
        const resp = await fetch('http://www.meteo.co.me/app/analiza/weather_now.json');
        const newData = await resp.json();
        const city = newData?.weatherNow?.data?.map(el => { return el.name === onboardingState?.initialCity?.cityName ? el : null }).filter(val => { return val !== null })
        const allCities = newData?.weatherNow?.data?.map(el => { return el.name !== onboardingState?.initialCity?.cityName ? el : null }).filter(val => { return val !== null });
        setData(newData);
        setMainCity(city);
        setAllCities(allCities);
    }

    useEffect(() => {
        fetchData();
        const dataInterval = setInterval(() => fetchData(), 60 * 1000);
        return () => clearInterval(dataInterval);
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.heading}>
                    <View style={styles.head_left}>
                        <Text style={styles.headDate}>{date?.today}</Text>
                        <Text style={styles.headCity}>{onboardingState?.initialCity?.cityName}</Text>
                    </View>
                    <View style={styles.head_right}>
                        <Image
                            source={require('../../../assets/images/logo3.png')}
                            style={{ width: 60, height: 60 }}
                        />
                    </View>
                </View>
                <View style={styles.body}>
                    {
                        !mainCity || !mainCity[0] ?
                            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={[styles.headCity, { textAlign: 'center', fontSize: 15 }]}>Trenutno nema podataka o vremenskoj prognozi za grad {onboardingState?.initialCity?.cityName}</Text>
                            </View>
                            :
                            <>
                                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        source={{ uri: mainCity && mainCity[0]?.weather_png }}
                                        style={{ width: width / 2.5, height: width / 2.5 }}
                                    />
                                    {/* <LottieView
                            source={require('../../../assets/animations/weather/rain_thunder.json')}
                            autoPlay
                            loop
                        /> */}
                                    {/* <SvgCss 
                            xml={mainCity && mainCity[0]?.weather_svg && mainCity[0]?.weather_svg} 
                            width="100%" 
                            height="100%" 
                        /> */}
                                    {/* <SvgUri
                            width="100%"
                            height="100%"
                            uri={mainCity[0]?.wind_svg}
                        /> */}
                                </View>
                                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={[styles.headCity, { textTransform: 'uppercase' }]}>{mainCity && mainCity[0]?.description}</Text>
                                    <View style={[styles.flex_cent]}>
                                        <View style={[styles.flex_cent, { flexDirection: 'column' }]}>
                                            <Text style={styles.wet_label}>Temp.</Text>
                                            <Text style={styles.wet_text}>{mainCity && mainCity[0]?.temperature}°C</Text>
                                        </View>
                                        <View style={[styles.flex_cent, styles.inf_box, { flexDirection: 'column' }]}>
                                            <Text style={styles.wet_label}>Vjetar (Brzina)</Text>
                                            {/* <Image
                                    source={{ uri: `http://meteo.co.me/Meteorologija/Pr/Gradovi/5danaA/Simbolcici/${city?.forecast[0]?.hourlyForecast[0]?.wind}` }}
                                    style={{
                                        width: 20,
                                        height: 20
                                    }}
                                /> */}
                                            {/* <SvgUri
                                    width="30"
                                    height="30"
                                    uri={`http://meteo.co.me/Meteorologija/Pr/Gradovi/5danaA/Simbolcici/${cityWeather.find(el => el.code === onboardingState?.initialCity)?.forecast[0]?.hourlyForecast[0]?.wind}`}
                                /> */}
                                            <Text style={styles.wet_text}>{mainCity && mainCity[0]?.wind_speed}</Text>
                                        </View>
                                        <View style={[styles.flex_cent, { flexDirection: 'column' }]}>
                                            <Text style={styles.wet_label}>Vjetar (Smjer)</Text>
                                            <Text style={styles.wet_text}>{mainCity && mainCity[0]?.wind_dir_360}</Text>
                                        </View>
                                    </View>
                                </View>
                            </>
                    }
                </View>
            </View>
            <View style={styles.other}>
                <View style={[styles.flex_even, { flex: 1 }]}>
                    <Text style={styles.headDate, { color: '#F4F7FF' }}>Ostali Gradovi</Text>
                    <Text style={styles.headDate, { color: '#F4F7FF' }}>{date?.today}</Text>
                </View>
                <View style={{ flex: 5 }}>
                    <FlatList
                        data={allCities}
                        keyExtractor={item => item.code}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            padding: 20
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.city_box}>
                                    <View style={styles.flex_cent}>
                                        <Image
                                            source={{ uri: item && item?.weather_png }}
                                            style={{ width: 60, height: 60 }}
                                        />
                                    </View>
                                    <View style={[styles.flex_cent, { flexDirection: 'column' }]}>
                                        <Text style={styles.headDate, { color: '#F4F7FF' }}>{item && item?.name}</Text>
                                        <Text style={styles.headDate, { color: '#F4F7FF' }}>{item && item?.temperature}°C</Text>
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
        flex: 3,
        backgroundColor: '#3555ae',
        width,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    heading: {
        width,
        flex: 1,
        // backgroundColor: 'red',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    body: {
        flex: 5,
        // backgroundColor: 'blue'
    },
    head_right: {
        width: 70,
        height: 70,
        borderRadius: 70 / 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headDate: {
        color: '#fab816',
        fontSize: 15
    },
    headCity: {
        color: '#3555ae',
        fontSize: 25,
        fontWeight: '700'
    },
    inf_box: {
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderLeftColor: '#fab816',
        borderRightColor: '#fab816',
    },
    wet_label: {
        color: '#fab816',
        fontSize: 14
    },
    wet_text: {
        fontSize: 25,
        color: '#3555ae',
        // fontWeight: '700'
    },
    city_box: {
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        width: 100,
        height: 130,
        backgroundColor: 'rgba(244, 247, 255, 0.25)',
        padding: 10,
        marginHorizontal: 5
        // backgroundColor: 'white'
    }
})
