import types from '../actions/types';

const DEFAULT_STATE = {
    searchPeopleResultUsers: null,
    friends: null,
    friendRequestSentToUsers: null,
    friendRequestFromUsers: null,
    shouldRefreshFriendData: false,
    shouldRefreshFriendRequestData: false
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.LOAD_FRIENDS_BY_UID: {
            const {payload} = action;

            if (payload.status === 200) {
                return {
                    ...state,
                    friends: payload.data.friends,
                    shouldRefreshFriendData: false
                };
            } else {
                return {...state};
            }
        }
        case types.LOAD_FRIEND_REQUEST_DATA: {
            const {payload} = action;

            if (payload.status === 200) {
                return{
                    ...state,
                    friendRequestSentToUsers: payload.data.requestRecipients,
                    friendRequestFromUsers: payload.data.requestSenders,
                    shouldRefreshFriendRequestData: false
                };
            } else {
                return {...state};
            }
        }
        case types.SEND_FRIEND_REQUEST: {
            const {payload} = action;

            if (payload.status === 201 && payload.data.success) {
                return {
                    ...state,
                    shouldRefreshFriendRequestData: true
                }
            }

            return {...state};
        }
        case types.ACCEPT_FRIEND_REQUEST: {
            const {payload} = action;

            if (payload.status === 201 && payload.data.success) {
                return {
                    ...state,
                    shouldRefreshFriendData: true,
                    shouldRefreshFriendRequestData: true
                }
            }

            return {...state};
        }
        case types.REJECT_FRIEND_REQUEST: {
            const {payload} = action;

            if (payload.status === 202 && payload.data.success) {
                return {
                    ...state,
                    shouldRefreshFriendRequestData: true
                }
            }

            return {...state};
        }
        case types.SEARCH_PEOPLE: {
            const {payload} = action;

            if (payload.status === 200) {
                const {data} = payload;

                if (data.success) {
                    return {
                        ...state,
                        searchPeopleResultUsers: data.users
                    };
                }
            }

            return {...state};
        }
        case types.CLOSE_SEARCH_PEOPLE_WINDOW: {
            return {
                ...state,
                searchPeopleResultUsers: null
            }
        }
        case types.RESET_SOCIAL_REDUCER_DATA:
        default:
            return state;
    }
}