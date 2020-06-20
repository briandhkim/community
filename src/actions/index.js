import axios from 'axios';
import types from './types';

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
};

export const getLoggedInUser = () => {
    //dispatch to be used to dispatch other actions if needed?
    return dispatch => {
        axios.get("/user/get-logged-in-user")
        .then(res => {
            dispatch(logInSuccess(res));
        })
        .catch(err => {
            console.log("fetching logged in user err: ", err);
        });
    };
};
const logInSuccess = payload => ({
    type: types.GET_LOGGED_IN_USER,
    payload
});

export const authenticateLogin = (values) => {
    let {email, password} = values;
    
    email = email.trim();
    password = password.trim();

    return dispatch => {
        axios.post('/user/login', {email, password}, {headers})
        .then(res => {
            dispatch(getLoggedInUser());
        })
        .catch(err => {
            console.log('user authenticate err: ', err);
        });
    };
};

export const signUp = (values) => {
    let {email, firstName, lastName, password} = values;

    email = email.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    password = password.trim();

    return dispatch => {
        axios.post('/user/signup', {email, firstName, lastName, password}, {headers})
        .then(res => {
            dispatch(signUpSuccess(res));
        })
        .catch(err => {
            console.log('signup err: ', err);
        });
    };
};
const signUpSuccess = payload => ({
    type: types.SIGN_UP,
    payload
});

export const logOut = () => {
    return dispatch => {
        axios.post('/user/logout')
        .then(res => {
            dispatch(logOutSuccess(res));
        })
        .catch(err => {
            console.log('logout err: ', err);
        });
    };
}
const logOutSuccess = payload => ({
    type: types.LOG_OUT,
    payload
});

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

export const loadFriendsByUID = (uid) => {
    return dispatch => {
        axios.post('/friends/load-friends', {uid}, {headers})
        .then(res => {
            dispatch(loadFriendByUISuccess(res));
        })
        .catch(err => {
            console.log('loading friendslist err: ', err);
        });
    };
};
const loadFriendByUISuccess = payload => ({
    type: types.LOAD_FRIENDS_BY_UID,
    payload
});
export const loadFriendRequestDataByUID = (uid) => {
    return dispatch => {
        axios.post('/friends/load-friend-request-data', {uid}, {headers})
        .then(res => {
            dispatch(loadFriendRequestDataByUIDSuccess(res));
        })
        .catch(err => {
            console.log('load friend req data err: ', err);
        });
    };
};
const loadFriendRequestDataByUIDSuccess = payload => ({
    type: types.LOAD_FRIEND_REQUEST_DATA,
    payload
});
export const sendFriendRequest = (fromUserUID, toUserUID) => {
    return dispatch => {
        axios.post('/friends/send-request', {fromUserUID, toUserUID}, {headers})
        .then(res => {
            //can likely call loadFriendRequestData instead
            //check social_reducer
            dispatch(sendFriendRequestSuccess(res));
        })
        .catch(err => {
            console.log('sending friend request err: ', err);
        });
    };
};
const sendFriendRequestSuccess = payload => ({
    type: types.SEND_FRIEND_REQUEST,
    payload
});
export const acceptFriendRequest = (fromUserUID, toUserUID) => {
    return dispatch => {
        axios.post('/friends/accept-request', {fromUserUID, toUserUID}, {headers})
        .then(res => {
            //can likely call loadFriends and loadFriendRequestData here instead
            //check social reducer
            dispatch(acceptFriendRequestSuccess(res));
        })
        .catch(err => {
            console.log('accept friend req err: ', err);
        });
    };
};
const acceptFriendRequestSuccess = payload => ({
    type: types.ACCEPT_FRIEND_REQUEST,
    payload
});
export const rejectFriendRequest = (fromUserUID, toUserUID) => {
    return dispatch => {
        axios.post('/friends/reject-request', {fromUserUID, toUserUID}, {headers})
        .then(res => {          
            //can likely call loadFriendRequestData instead
            //check social_reducer
            dispatch(rejectFriendRequestSuccess(res));
        })
        .catch(err => {
            console.log('reject friend req err: ', err);
        });
    };
};
const rejectFriendRequestSuccess = payload => ({
    type: types.REJECT_FRIEND_REQUEST,
    payload
});

export function toggleSearchInProgress() {
    return {
        type: types.TOGGLE_SEARCH_IN_PROGRESS,
        payload: {}
    };
}
export const searchPeople = (searchValue) => {
    //should probably move toggleSearchInProgress dispatch here

    return dispatch => {
        axios.post('/search-people', {searchValue}, {headers})
        .then(res => {
            dispatch(searchPeopleSuccess(res));
        })
        .catch(err => {
            console.log('search people err: ', err);
        });
    };
};
const searchPeopleSuccess = payload => ({
    type: types.SEARCH_PEOPLE,
    payload
});

export function resetSocialReducerData() {
    return {
        type: types.RESET_SOCIAL_REDUCER_DATA,
        payload: {}
    };
}

export const openDirectMessage = (uid_a, uid_b) => {
    return dispatch => {
        axios.post('/chat/load-dm-data', {uid_a, uid_b}, {headers})
        .then(res => {            
            //can likely just call loadChatData here later
            //check chat_reducer
            dispatch(openDirectMessageSuccess(res));
        })
        .catch(err => {
            console.log('open dm err: ', err);
        });
    };
};
const openDirectMessageSuccess = payload => ({
    type: types.OPEN_DIRECT_MESSAGE,
    payload
});

export const loadChatData = (chat_uid) => {
    return dispatch => {
        axios.post('/chat/load-chat-data', {chat_uid}, {headers})
        .then(res => {
            dispatch(loadChatDataSuccess(res));
        })
        .catch(err => {
            console.log('load chat data err: ', err);
        });
    };
};
const loadChatDataSuccess = payload => ({
    type: types.LOAD_CHAT_DATA,
    payload
});

export const sendMessage = (chat_uid, user_uid, message) => {
    return dispatch => {
        axios.post('/chat/insert-new-message', {chat_uid, user_uid, message}, {headers})
        .then(res => {
            dispatch(sendMessageSuccess(res));
        })
        .catch(err => {
            console.log('sending message err: ', err);
        });
    };
};
const sendMessageSuccess = payload => ({
    type: types.SEND_MESSAGE,
    payload
});