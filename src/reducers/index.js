import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import chatReducer from './chat_reducer';
import userReducer from './user_reducer';
import mainBodyReducer from './main_body_reducer';
import socialReducer from './social_reducer';

export default combineReducers(
    {
        form: formReducer,
        chat: chatReducer,
        user: userReducer,
        mainBody: mainBodyReducer,
        social: socialReducer
    }
);