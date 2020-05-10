import types from '../actions/types';

const DEFAUT_STATE = {
    signUpSuccessful: null,
    isLoggedIn: false,
    user: {test: "abcd"}
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
            const {payload} = action;

            if (payload.status === 201) {

                return {
                    ...state,
                    signUpSuccessful: true
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