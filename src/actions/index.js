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
            return {
                type: types.SIGN_UP,
                payload: res
            };
        })
        .catch(err => {
            console.log('signup err: ', err);
        });
    };
};

export const logOut = () => {
    return dispatch => {
        axios.post('/user/logout')
        .then(res => {
            return {
                type: types.LOG_OUT,
                payload: res
            };
        })
        .catch(err => {
            console.log('logout err: ', err);
        });
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

export const loadFriendsByUID = (uid) => {
    return dispatch => {
        axios.post('/friends/load-friends', {uid}, {headers})
        .then(res => {
            return {
                type: types.LOAD_FRIENDS_BY_UID,
                payload: res
            };
        })
        .catch(err => {
            console.log('loading friendslist err: ', err);
        });
    };
};
export const loadFriendRequestDataByUID = (uid) => {
    return dispatch => {
        axios.post('/friends/load-friend-request-data', {uid}, {headers})
        .then(res => {
            return {
                type: types.LOAD_FRIEND_REQUEST_DATA,
                payload: res
            };
        })
        .catch(err => {
            console.log('load friend req data err: ', err);
        });
    };
};
export const sendFriendRequest = (fromUserUID, toUserUID) => {
    return dispatch => {
        axios.post('/friends/send-request', {fromUserUID, toUserUID}, {headers})
        .then(res => {
            return {
                type: types.SEND_FRIEND_REQUEST,
                payload: res
            };
        })
        .catch(err => {
            console.log('sending friend request err: ', err);
        });
    };
};
export const acceptFriendRequest = (fromUserUID, toUserUID) => {
    return dispatch => {
        axios.post('/friends/accept-request', {fromUserUID, toUserUID}, {headers})
        .then(res => {
            return {
                type: types.ACCEPT_FRIEND_REQUEST,
                payload: res
            };
        })
        .catch(err => {
            console.log('accept friend req err: ', err);
        });
    };
};
export const rejectFriendRequest = (fromUserUID, toUserUID) => {
    return dispatch => {
        axios.post('/friends/reject-request', {fromUserUID, toUserUID}, {headers})
        .then(res => {            
            return {
                type: types.REJECT_FRIEND_REQUEST,
                payload: res
            };
        })
        .catch(err => {
            console.log('reject friend req err: ', err);
        });
    };
};

export function toggleSearchInProgress() {
    return {
        type: types.TOGGLE_SEARCH_IN_PROGRESS,
        payload: {}
    };
}
export const searchPeople = (searchValue) => {
    return dispatch => {
        axios.post('/search-people', {searchValue}, {headers})
        .then(res => {
            return {
                type: types.SEARCH_PEOPLE,
                payload: res
            };
        })
        .catch(err => {
            console.log('search people err: ', err);
        });
    };
};

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
            return {
                type: types.OPEN_DIRECT_MESSAGE,
                payload: res
            };
        })
        .catch(err => {
            console.log('open dm err: ', err);
        });
    };
};

export const loadChatData = (chat_uid) => {
    return dispatch => {
        axios.post('/chat/load-chat-data', {chat_uid}, {headers})
        .then(res => {
            return {
                type: types.LOAD_CHAT_DATA,
                payload: res
            };
        })
        .catch(err => {
            console.log('load chat data err: ', err);
        });
    };
};

export const sendMessage = (chat_uid, user_uid, message) => {
    return dispatch => {
        axios.post('/chat/insert-new-message', {chat_uid, user_uid, message}, {headers})
        .then(res => {
            return {
                type: types.SEND_MESSAGE,
                payload: res
            };
        })
        .catch(err => {
            console.log('sending message err: ', err);
        });
    };
};