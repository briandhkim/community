import types from '../actions/types';

const DEFAULT_STATE = {
    showSearchPeople: false,
    showDefaultScreen: true
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.SHOW_SEARCH_PEOPLE:{
            return {
                ...state,
                showSearchPeople: true
            }
        }
        case types.CLOSE_SEARCH_PEOPLE:{
            return {
                ...state,
                showSearchPeople: false
            }
        }
        default:
            return state;
    }
}