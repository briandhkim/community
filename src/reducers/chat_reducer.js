import types from '../actions/types';

const DEFAULT_STATE = {
    activeChat: null,
    activeChatMessages: null
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.OPEN_DIRECT_MESSAGE:{
            const {payload} = action;

            if (payload.status ===200) {
                const {data} = payload;
                const {chat, messages} = data;

                return {
                    ...state,
                    activeChat: chat,
                    activeChatMessages: messages
                }
            }

            return {...state}
        }
        default: 
            return state;
    }
}