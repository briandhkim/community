import types from '../actions/types';

const DEFAULT_STATE = {
    activeChat: null,
    activeChatMessages: null,
    insertedMessage: null
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.OPEN_DIRECT_MESSAGE:
        case types.LOAD_CHAT_DATA:{
            const {payload} = action;

            if (payload.status === 200) {
                const {chat, messages} = payload.data;

                return {
                    ...state,
                    activeChat: chat,
                    activeChatMessages: messages,
                    insertedMessage: null
                }
            }

            return {...state}
        }
        case types.SEND_MESSAGE:{
            const {payload} = action;

            if (payload.status === 200) {
                return {
                    ...state,
                    insertedMessage: true
                }
            }

            return {
                ...state,
                insertedMessage: false
            }
        }
        default: 
            return state;
    }
}