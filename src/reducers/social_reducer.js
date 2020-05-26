import types from '../actions/types';

const DEFAULT_STATE = {
    searchInProgress: false,
    searchPeopleResultUsers: null,
    friends: null,
    friendRequestSentToUsers: null,
    friendRequestFromUsers: null
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.LOAD_FRIENDS_BY_UID: {
            const {payload} = action;

            if (payload.status === 200) {
                return {
                    ...state,
                    friends: payload.data.friends
                };
            } else {
                return {...state};
            }
        }
        case types.LOAD_FRIEND_REQUEST_DATA: {
            const {payload} = action;
            console.log(payload);

            if (payload.status === 200) {
                return{
                    ...state,
                    friendRequestSentToUsers: payload.data.requestRecipients,
                    friendRequestFromUsers: payload.data.requestSenders
                };
            } else {
                return {...state};
            }
        }
        case types.TOGGLE_SEARCH_IN_PROGRESS: {
            return {
                ...state,
                searchInProgress: true
            };
        }
        case types.SEARCH_PEOPLE: {
            const {payload} = action;

            if (payload.status === 200) {
                const {data} = payload;

                if (data.success) {
                    return {
                        ...state,
                        searchInProgress: false,
                        searchPeopleResultUsers: data.users
                    };
                }
            }

            return {...state};
        }
        case types.RESET_SOCIAL_REDUCER_DATA:
        default:
            return state;
    }
}