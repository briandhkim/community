import types from '../actions/types';

const DEFAULT_STATE = {
    activeChat: null
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.OPEN_DIRECT_MESSAGE:{
            const {payload} = action;
            console.log(payload);

            return {
                ...state
            }
        }
        default: 
            return state;
    }
}