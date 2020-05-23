import types from '../actions/types';

const DEFAUT_STATE = {
    signUpSuccessful: null,
    isLoggedIn: false,
    user: null,
    loginError: '',
    logoutError: '',
    friends : null
};

export default (state = DEFAUT_STATE, action) => {
    switch(action.type) {
        case types.GET_LOGGED_IN_USER:{
            const {payload} = action;

            if (payload.status === 200) {
                const {data} = payload;

                if (data.userFound) {
                    const {user} = data;
                    return {
                        ...state,
                        isLoggedIn: true,
                        user
                    };
                }
            }
            
            return {
                ...state
            };
        }
        case types.AUTHENTICATE_LOGIN:{
            const {payload} = action;

            if (payload.status === 202 || payload.status === 200) {
                const {data} = payload;

                if (!data.success) {
                    return {
                        ...state,
                        isLoggedIn: false,
                        loginError: data.error
                    };
                } else {                    
                    return {
                        ...state,
                        isLoggedIn: true,
                        loginError: null
                    };
                }

            } else {
                let loginError = '';
                if (payload.response.status === 403 || !payload.response.data.success) {
                    loginError = payload.response.data.error
                }

                return {
                    ...state,
                    isLoggedIn: false,
                    loginError
                };
            }
        }
        case types.LOG_OUT:{
            const {payload} = action;

            if (payload.status === 200 && payload.data.success) {
                return {
                    ...state,
                    isLoggedIn: false,
                    user: null,
                    logoutError: '',
                    friends: null
                };
            }

            return {
                ...state,
                isLoggedIn: false,
                user: null,
                logoutError: "Encountered error logging out",
                friends: null
            };

        }
        case types.SIGN_UP:{
            const {payload} = action;

            if (payload.status === 201) {

                return {
                    ...state,
                    signUpSuccessful: payload.data.success
                };

            } else {
                return {
                    ...state,
                    isLoggedIn: false,
                    user: null
                };
            }
        }
        case types.LOAD_FRIENDS_BY_UID: {
            const {payload} = action;

            if (payload.status === 200) {
                return {
                    ...state,
                    friends: payload.data.friends
                };
            } else {
                return {...state};
            }
        }
        default:
            //console.log("state at user_reducer default", state);
            return state;
    }
}