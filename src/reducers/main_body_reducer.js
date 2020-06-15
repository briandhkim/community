import types from '../actions/types';

const DEFAULT_STATE = {
    showChatWindow: false,
    showSearchPeopleWindow: false,
    showDefaultScreen: true
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.OPEN_DIRECT_MESSAGE:{
            return {
                ...state,
                showSearchPeopleWindow: false,
                showChatWindow: true
            }
        }
        case types.SHOW_SEARCH_PEOPLE_WINDOW:{
            return {
                ...state,
                showSearchPeopleWindow: true,
                showChatWindow: false
            }
        }
        case types.CLOSE_SEARCH_PEOPLE_WINDOW:{
            return {
                ...state,
                showSearchPeopleWindow: false
            }
        }
        default:
            return state;
    }
}