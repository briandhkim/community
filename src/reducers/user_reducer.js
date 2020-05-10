import types from '../actions/types';

const DEFAUT_STATE = {
    signUpSuccessful: null,
    isLoggedIn: false,
    user: null,
    error: ''
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
            var {payload} = action;

            if (payload.status === 202) {
                return {
                    ...state,
                    isLoggedIn: true,
                    error: null
                }
            } else if (payload.status === 200) {
                return {
                    ...state,
                    isLoggedIn: false,
                    error: payload.data.error
                }
            } else {
                let error = '';
                if (payload.response.status === 403 || !payload.response.data.success) {
                    error = payload.response.data.error
                }

                return {
                    ...state,
                    isLoggedIn: false,
                    error
                }
            }

        case types.SIGN_UP:
            console.log(`in user_reducer for ${types.SIGN_UP}`, action);
            var {payload} = action;

            if (payload.status === 201) {

                return {
                    ...state,
                    signUpSuccessful: payload.data.success
                }

            } else {
                return {
                    ...state,
                    isLoggedIn: false,
                    user: null
                }
            }

        default:
            //console.log("state at user_reducer default", state);
            return state;
    }
}