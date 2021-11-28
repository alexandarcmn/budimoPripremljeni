import { combineReducers } from 'redux';

import onboarding_reducer from './onboarding_reducer';
import city_reducer from './city_reducer';

const rootReducer = combineReducers({
    onboarding_reducer,
    city_reducer
});

export default rootReducer;