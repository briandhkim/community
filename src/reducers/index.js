import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import userReducer from './user_reducer';
import mainBodyReducer from './main_body_reducer';

export default combineReducers(
    {
        form: formReducer,
        user: userReducer,
        mainBody: mainBodyReducer
    }
);