import { SET_INITIAL_CITY } from '../types';

export default function setInitialCity(id){
    return{
        type: SET_INITIAL_CITY,
        payload: id
    }
}