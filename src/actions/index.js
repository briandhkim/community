import axios from 'axios';
import types from './types';

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
};

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

export function signUp(values) {

    let {email, firstName, lastName, password} = values;

    // console.log("signUp in actions index", values);

    email = email.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    password = password.trim();

    const req = axios.post('/signup', {email, firstName, lastName, password}, {
        headers: headers
    });

    return {
        type: types.SIGN_UP,
        payload: req 
    }
}