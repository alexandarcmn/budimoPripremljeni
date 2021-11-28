import { SET_INITIAL_CITY } from '../types';

const initialState = {
    initialCity: ''
}

export default function onboarding_reducer(state = initialState, action){
    switch(action.type){
        case SET_INITIAL_CITY:
            return{
                ...state,
                initialCity: action.payload
            }
        default:
            return state;
    }
}