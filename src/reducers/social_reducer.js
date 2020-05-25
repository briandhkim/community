import types from '../actions/types';

const DEFAULT_STATE = {
    searchPeopleResultUsers: null
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.SEARCH_PEOPLE: {
            const {payload} = action;

            if (payload.status === 200) {
                const {data} = payload;
                console.log(data);

                if (data.success) {
                    return {
                        ...state,
                        searchPeopleResultUsers: data.users
                    };
                }
            }

            return {...state};
        }
        default:
            return state;
    }
}