import types from '../actions/types';

const DEFAULT_STATE = {
    signingUp: false,
    loggingIn: false,
    sendingMessage: false,
    loadingChat: false,
    loadingDirectMessage: false
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
            }
        }
        default:
            return state;
    }
}