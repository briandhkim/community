import types from './types';

export function getUser() {
    //axios request here

    const data = {
        user: "bkim"
    };

    return {
        type: types.GET_USER,
        payload: data
    }
}

export function authenticateLogin(values) {

    const {email, password} = values;

    console.log("in actions index", email, password);

    const data = {
        loginValid: "in actions index.js"
    };

    return {
        type: types.AUTHENTICATE_LOGIN,
        payload: data
    }
}