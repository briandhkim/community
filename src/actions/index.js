import types from './types';

export function getLoggedInUser() {
    //axios request here
    console.log("getLoggedInUser in actions index");
    
    const data = {
        getLoggedInUser: "data here"
    };
    
    return {
        type: types.GET_LOGGED_IN_USER,
        payload: data
    }
}

export function authenticateLogin(values) {
    
    const {email, password} = values;
    
    console.log("authenticateLogin in actions index", values);

    const data = {
        authenticateLogin: "data here"
    };

    return {
        type: types.AUTHENTICATE_LOGIN,
        payload: data
    }
}