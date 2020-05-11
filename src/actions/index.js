import axios from 'axios';
import types from './types';

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
};

export function getLoggedInUser() {
    const req = axios.get("/get-logged-in-user");
    
    return {
        type: types.GET_LOGGED_IN_USER,
        payload: req
    }
}

export function authenticateLogin(values) {
    let {email, password} = values;
    
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