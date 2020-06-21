import types from '../actions/types';

const DEFAULT_STATE = {
    signingUp               : false,
    loggingIn               : false,
    searchingPeople         : false,
    sendingFriendRequest    : false,
    acceptingFriendRequest  : false,
    rejectingFriendRequest  : false,
    sendingMessage          : false,
    loadingChat             : false,
    loadingDirectMessage    : false
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.SIGN_UP_START:{
            return {
                ...state,
                signingUp: true
            };
        }
        case types.SIGN_UP_END:{
            return {
                ...state,
                signingUp: false
            };
        }
        case types.AUTHENTICATE_LOGIN_START:{
            return {
                ...state,
                loggingIn: true
            };
        }
        case types.AUTHENTICATE_LOGIN_END:{
            return {
                ...state,
                loggingIn: false
            };
        }
        case types.SEARCH_PEOPE_START:{
            return {
                ...state,
                searchingPeople: true
            };
        }
        case types.SEARCH_PEOPLE_END:{
            return {
                ...state,
                searchingPeople: false
            };
        }
        case types.SEND_FRIEND_REQUEST_START:{
            return {
                ...state,
                sendingFriendRequest: true
            };
        }
        case types.SEND_FRIEND_REQUEST_END:{
            return {
                ...state,
                sendingFriendRequest: false
            };
        }
        case types.ACCEPT_FRIEND_REQUEST_START:{
            return {
                ...state,
                acceptingFriendRequest: true
            };
        }
        case types.ACCEPT_FRIEND_REQUEST_END:{
            return {
                ...state,
                acceptingFriendRequest: false
            };
        }
        case types.REJECT_FRIEND_REQUEST_START:{
            return {
                ...state,
                rejectingFriendRequest: true
            }
        }
        case types.REJECT_FRIEND_REQUEST_END:{
            return {
                ...state,
                rejectingFriendRequest: false
            }
        }
        default:
            return state;
    }
}