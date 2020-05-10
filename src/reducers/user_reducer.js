import types from '../actions/types';

const DEFAUT_STATE = {
    user: null,
    userName: null
};

export default function(state = DEFAUT_STATE, action) {
    switch(action.type) {
        case types.GET_LOGGED_IN_USER:
            console.log(`in user_reducer for ${types.GET_LOGGED_IN_USER}`, action);
            
            return {
                ...state
            }
        case types.AUTHENTICATE_LOGIN:
            console.log(`in user_reducer for ${types.AUTHENTICATE_LOGIN}`, action);

            return {
                ...state
            }
        case types.SIGN_UP:
            console.log(`in user_reducer for ${types.SIGN_UP}`, action);

            return {
                ...state
            }
        default:
            //console.log("state at user_reducer default", state);
            return state;
    }
}