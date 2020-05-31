import axios from 'axios';
import types from './types';

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
};

export function getLoggedInUser() {
    const req = axios.get("/user/get-logged-in-user");
    
    return {
        type: types.GET_LOGGED_IN_USER,
        payload: req
    };
}

export function authenticateLogin(values) {
    let {email, password} = values;
    
    email = email.trim();
    password = password.trim();

    const req = axios.post('/user/login', {email, password}, {headers});

    return {
        type: types.AUTHENTICATE_LOGIN,
        payload: req
    };
}

export function signUp(values) {
    let {email, firstName, lastName, password} = values;

    email = email.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    password = password.trim();

    const req = axios.post('/user/signup', {email, firstName, lastName, password}, {headers});

    return {
        type: types.SIGN_UP,
        payload: req 
    };
}

export function logOut() {
    const req = axios.post('/user/logout');

    return {
        type: types.LOG_OUT,
        payload: req
    };
}

export function showSearchPeopleWindow() {
    return {
        type: types.SHOW_SEARCH_PEOPLE_WINDOW,
        payload: {}
    }
}
export function closeSearchPeopleWindow() {
    return {
        type: types.CLOSE_SEARCH_PEOPLE_WINDOW,
        payload: {}
    }
}

export function loadFriendsByUID(uid) {
    const req = axios.post('/friends/load-friends', {uid}, {headers});

    return {
        type: types.LOAD_FRIENDS_BY_UID,
        payload: req
    }
}
export function loadFriendRequestDataByUID(uid) {
    const req = axios.post('/friends/load-friend-request-data', {uid}, {headers});

    return {
        type: types.LOAD_FRIEND_REQUEST_DATA,
        payload: req
    }
}
export function sendFriendRequest(fromUserUID, toUserUID) {
    const req = axios.post('/friends/send-request', {fromUserUID, toUserUID}, {headers});

    return {
        type: types.SEND_FRIEND_REQUEST,
        payload: req
    }
}

export function toggleSearchInProgress() {
    return {
        type: types.TOGGLE_SEARCH_IN_PROGRESS,
        payload: {}
    }
}
export function searchPeople(searchValue) {
    const req = axios.post('/search-people', {searchValue}, {headers});

    return {
        type: types.SEARCH_PEOPLE,
        payload: req
    }
}

export function resetSocialReducerData() {
    return {
        type: types.RESET_SOCIAL_REDUCER_DATA,
        payload: {}
    }
}