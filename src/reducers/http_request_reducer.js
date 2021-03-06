import types from '../actions/types';

const DEFAULT_STATE = {
    signingUp               : false,
    loggingIn               : false,
    loggingOut              : false,
    searchingPeople         : false,
    sendingFriendRequest    : false,
    acceptingFriendRequest  : false,
    rejectingFriendRequest  : false,
    loadingAvailableChatList: false,
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
        case types.LOG_OUT_START:{
            return {
                ...state,
                loggingOut: true
            };
        }
        case types.LOG_OUT_END:{
            return {
                ...state,
                loggingOut: false
            }
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
            };
        }
        case types.REJECT_FRIEND_REQUEST_END:{
            return {
                ...state,
                rejectingFriendRequest: false
            };
        }
        case types.SEND_MESSAGE_START:{
            return {
                ...state,
                sendingMessage: true
            };
        }
        case types.SEND_MESSAGE_END:{
            return {
                ...state,
                sendingMessage: false
            };
        }
        case types.LOAD_AVAILABLE_CHAT_LIST_START:{
            return {
                ...state,
                loadingAvailableChatList: true
            };
        }
        case types.LOAD_AVAILABLE_CHAT_LIST_END:{
            return {
                ...state,
                loadingAvailableChatList: false,
            };
        }
        default:
            return state;
    }
}