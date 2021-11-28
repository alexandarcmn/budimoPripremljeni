import { GET_ALL_CITIES } from '../types';

export const getAllCities = () => {
    try {
        return async dispatch => {
            const response = await fetch('http://www.meteo.co.me/app/model/');
            const json = await response.json();
            console.log('2222222222222222', json);
            return json && dispatch(updateAllCities(json))
        }
    } catch (error) {
        console.error(error);
    }
}

export function updateAllCities(req) {
    return {
        type: GET_ALL_CITIES,
        payload: req
    }
}