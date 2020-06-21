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

    return (dispatch, getState) => {
        if (getState().httpRequest.loggingIn) return;

        dispatch(authenticateLoginStarted());

        axios.post('/user/login', {email, password}, {headers})
        .then(res => {
            dispatch(authenticateLoginFinished());
            dispatch(getLoggedInUser());
        })
        .catch(err => {
            dispatch(authenticateLoginFinished());
            console.log('user authenticate err: ', err);
        });
    };
};
const authenticateLoginStarted = () => ({
    type: types.AUTHENTICATE_LOGIN_START
});
const authenticateLoginFinished = () => ({
    type: types.AUTHENTICATE_LOGIN_END
});

export const signUp = (values) => {
    let {email, firstName, lastName, password} = values;

    email = email.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    password = password.trim();

    return (dispatch, getState) => {
        if (getState().httpRequest.signingUp) return;

        dispatch(signUpStarted());

        axios.post('/user/signup', {email, firstName, lastName, password}, {headers})
        .then(res => {
            dispatch(signUpFinished());
            dispatch(signUpSuccess(res));
        })
        .catch(err => {
            dispatch(signUpFinished());
            console.log('signup err: ', err);
        });
    };
};
const signUpStarted = () => ({
    type: types.SIGN_UP_START
});
const signUpFinished = () => ({
    type: types.SIGN_UP_END
});
const signUpSuccess = payload => ({
    type: types.SIGN_UP,
    payload
});

export const logOut = () => {
    return (dispatch, getState) => {
        if (getState().httpRequest.loggingOut) return;

        dispatch(logOutStarted());

        axios.post('/user/logout')
        .then(res => {
            dispatch(logOutFinished());
            dispatch(logOutSuccess(res));
        })
        .catch(err => {
            dispatch(logOutFinished());
            console.log('logout err: ', err);
        });
    };
}
const logOutStarted = () => ({
    type: types.LOG_OUT_START
});
const logOutFinished = () => ({
    type: types.LOG_OUT_END
});
const logOutSuccess = payload => ({
    type: types.LOG_OUT,
    payload
});

export function showSearchPeopleWindow() {
    return {
        type: types.SHOW_SEARCH_PEOPLE_WINDOW
    };
}
export function closeSearchPeopleWindow() {
    return {
        type: types.CLOSE_SEARCH_PEOPLE_WINDOW
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
    return (dispatch, getState) => {
        if (getState().httpRequest.sendingFriendRequest) return;

        dispatch(sendFriendRequestStarted());

        axios.post('/friends/send-request', {fromUserUID, toUserUID}, {headers})
        .then(res => {
            dispatch(sendFriendRequestFinished());
            if (res.status === 201 && res.data.success) {
                const {user} = getState().user;
                dispatch(loadFriendRequestDataByUID(user.uid));
            }
        })
        .catch(err => {
            dispatch(sendFriendRequestFinished());
            console.log('sending friend request err: ', err);
        });
    };
};
const sendFriendRequestStarted = () => ({
    type: types.SEND_FRIEND_REQUEST_START
});
const sendFriendRequestFinished = () => ({
    type: types.SEND_FRIEND_REQUEST_END
});

export const acceptFriendRequest = (fromUserUID, toUserUID) => {
    return (dispatch, getState) => {
        if (getState().httpRequest.acceptingFriendRequest) return;

        dispatch(acceptFriendRequestStarted());

        axios.post('/friends/accept-request', {fromUserUID, toUserUID}, {headers})
        .then(res => {
            dispatch(acceptFriendRequestFinished());
            
            if (res.status === 201 && res.data.success) {
                const {user} = getState().user;
                dispatch(loadFriendRequestDataByUID(user.uid));
                dispatch(loadFriendsByUID(user.uid));
            }
        })
        .catch(err => {
            dispatch(acceptFriendRequestFinished());
            console.log('accept friend req err: ', err);
        });
    };
};
const acceptFriendRequestStarted = () => ({
    type: types.ACCEPT_FRIEND_REQUEST_START
});
const acceptFriendRequestFinished = () => ({
    type: types.ACCEPT_FRIEND_REQUEST_END
});

export const rejectFriendRequest = (fromUserUID, toUserUID) => {
    return (dispatch, getState) => {
        if (getState().httpRequest.rejectingFriendRequest) return;

        dispatch(rejectFriendRequestStarted());

        axios.post('/friends/reject-request', {fromUserUID, toUserUID}, {headers})
        .then(res => {          
            dispatch(rejectFriendRequestFinished());

            if (res.status === 202 && res.data.success) {
                const {user} = getState().user;
                dispatch(loadFriendRequestDataByUID(user.uid));
            }
        })
        .catch(err => {
            dispatch(rejectFriendRequestFinished());
            console.log('reject friend req err: ', err);
        });
    };
};
const rejectFriendRequestStarted = () => ({
    type: types.REJECT_FRIEND_REQUEST_START
});
const rejectFriendRequestFinished = () => ({
    type: types.REJECT_FRIEND_REQUEST_END
});

export const searchPeople = (searchValue) => {
    return (dispatch, getState) => {
        if (getState().httpRequest.searchingPeople) return;

        dispatch(searchPeopleStarted());

        axios.post('/search-people', {searchValue}, {headers})
        .then(res => {
            dispatch(searchPeopleFinished());
            dispatch(searchPeopleSuccess(res));
        })
        .catch(err => {
            dispatch(searchPeopleFinished());
            console.log('search people err: ', err);
        });
    };
};
const searchPeopleStarted = () => ({
    type: types.SEARCH_PEOPE_START
});
const searchPeopleFinished = () => ({
    type: types.SEARCH_PEOPLE_END
});
const searchPeopleSuccess = payload => ({
    type: types.SEARCH_PEOPLE,
    payload
});

export function resetSocialReducerData() {
    return {
        type: types.RESET_SOCIAL_REDUCER_DATA
    };
}

export const openDirectMessage = (uid_a, uid_b) => {
    return dispatch => {
        axios.post('/chat/load-dm-data', {uid_a, uid_b}, {headers})
        .then(res => {            
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
    return (dispatch, getState) => {
        if (getState().httpRequest.sendingMessage) return;

        dispatch(sendMessageStarted());

        axios.post('/chat/insert-new-message', {chat_uid, user_uid, message}, {headers})
        .then(res => {
            dispatch(sendMessageFinished());

            if (res.status === 200) {
                const {activeChat} = getState().chat;
                
                dispatch(loadChatData(activeChat.uid));
            }
        })
        .catch(err => {
            dispatch(sendMessageFinished());
            console.log('sending message err: ', err);
        });
    };
};
const sendMessageStarted = () => ({
    type: types.SEND_MESSAGE_START
});
const sendMessageFinished = () => ({
    type: types.SEND_MESSAGE_END
});
const sendMessageSuccess = payload => ({
    type: types.SEND_MESSAGE,
    payload
});