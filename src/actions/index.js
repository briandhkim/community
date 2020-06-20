import axios from 'axios';
import types from './types';

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
};

export function getLoggedInUser() {
    const payload = axios.get("/user/get-logged-in-user");
    
    return {
        type: types.GET_LOGGED_IN_USER,
        payload
    };
}

export function authenticateLogin(values) {
    let {email, password} = values;
    
    email = email.trim();
    password = password.trim();

    const payload = axios.post('/user/login', {email, password}, {headers});

    return {
        type: types.AUTHENTICATE_LOGIN,
        payload
    };
}

export function signUp(values) {
    let {email, firstName, lastName, password} = values;

    email = email.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    password = password.trim();

    const payload = axios.post('/user/signup', {email, firstName, lastName, password}, {headers});

    return {
        type: types.SIGN_UP,
        payload 
    };
}

export function logOut() {
    const payload = axios.post('/user/logout');

    return {
        type: types.LOG_OUT,
        payload
    };
}

export function showSearchPeopleWindow() {
    return {
        type: types.SHOW_SEARCH_PEOPLE_WINDOW,
        payload: {}
    };
}
export function closeSearchPeopleWindow() {
    return {
        type: types.CLOSE_SEARCH_PEOPLE_WINDOW,
        payload: {}
    };
}

export function loadFriendsByUID(uid) {
    const payload = axios.post('/friends/load-friends', {uid}, {headers});

    return {
        type: types.LOAD_FRIENDS_BY_UID,
        payload
    };
}
export function loadFriendRequestDataByUID(uid) {
    const req = axios.post('/friends/load-friend-request-data', {uid}, {headers});

    return {
        type: types.LOAD_FRIEND_REQUEST_DATA,
        payload: req
    };
}
export function sendFriendRequest(fromUserUID, toUserUID) {
    const payload = axios.post('/friends/send-request', {fromUserUID, toUserUID}, {headers});

    return {
        type: types.SEND_FRIEND_REQUEST,
        payload
    };
}
export function acceptFriendRequest(fromUserUID, toUserUID) {
    const payload = axios.post('/friends/accept-request', {fromUserUID, toUserUID}, {headers});

    return {
        type: types.ACCEPT_FRIEND_REQUEST,
        payload
    };
}
export function rejectFriendRequest(fromUserUID, toUserUID) {
    const payload = axios.post('/friends/reject-request', {fromUserUID, toUserUID}, {headers});

    return {
        type: types.REJECT_FRIEND_REQUEST,
        payload
    };
}

export function toggleSearchInProgress() {
    return {
        type: types.TOGGLE_SEARCH_IN_PROGRESS,
        payload: {}
    };
}
export function searchPeople(searchValue) {
    const payload = axios.post('/search-people', {searchValue}, {headers});

    return {
        type: types.SEARCH_PEOPLE,
        payload
    };
}

export function resetSocialReducerData() {
    return {
        type: types.RESET_SOCIAL_REDUCER_DATA,
        payload: {}
    };
}

export function openDirectMessage(uid_a, uid_b) {
    const payload = axios.post('/chat/load-dm-data', {uid_a, uid_b}, {headers});

    return {
        type: types.OPEN_DIRECT_MESSAGE,
        payload
    }
}

export function loadChatData(chat_uid) {
    const payload = axios.post('/chat/load-chat-data', {chat_uid}, {headers});

    return {
        type: types.LOAD_CHAT_DATA,
        payload
    }
}

export function sendMessage(chat_uid, user_uid, message) {
    const payload = axios.post('/chat/insert-new-message', {chat_uid, user_uid, message}, {headers});

    return {
        type: types.SEND_MESSAGE,
        payload
    }
}