import types from '../actions/types';

const DEFAUT_STATE = {
    user: null,
    userName: null
};

export default function(state = DEFAUT_STATE, action) {
    switch(action.type) {
        case types.GET_USER:
            console.log("action:", action);
            if (action.payload) {
                console.log("in user_reducer:", action);
            } else {
                console.log("in user_reducer no action payload");
            }

            return {
                ...state,
                user: "user set in user_reducer",
                userName: "from user_reducer"
            }
        default:
            //console.log("state at user_reducer default", state);
            return state;
    }
}