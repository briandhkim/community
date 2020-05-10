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
    
    let {email, password} = values;
    
    // console.log("authenticateLogin in actions index", values);

    email = email.trim();
    password = password.trim();

    const req = axios.post('/login', {email, password}, {
        headers: headers
    });

    return {
        type: types.AUTHENTICATE_LOGIN,
        payload: req
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