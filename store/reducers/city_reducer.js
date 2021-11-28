import { GET_ALL_CITIES } from '../types';

const initialState = {
    allCities: ''
}

export default function city_reducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_CITIES:
            return{
                ...state,
                allCities: action.payload
            }
        default:
            return state;
    }
}