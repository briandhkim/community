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

    const {email, firstName, lastName, password} = values;

    console.log("signUp in actions index", values);

    axios.post('/signup', {email, firstName, lastName, password}, {
        headers: headers
    })
        .then(res => {
            console.log("signUp axios res: ", res);
        })
        .catch(err => {
            console.log("error in signUp action/index", err);
        });

    const data = {
        signUp: "date here"
    }

    return {
        type: types.SIGN_UP,
        payload: data
    }
}