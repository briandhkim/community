import types from '../actions/types';

const DEFAULT_STATE = {
    availableChatList: null,
    activeChat: null,
    activeChatMessages: null,
    pollingIntervalID: null,
    pollingChatUID: null,
    //deprecated
    insertedMessage: null
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.LOAD_AVAILABLE_CHAT_LIST:{
            const {payload} = action;
            console.log(payload);

            if (payload.status === 200) {
                const {chatList} = payload.data;

                return {
                    ...state,
                    availableChatList: chatList
                }
            }

            return {...state};
        }
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
        case types.SET_CHAT_POLLING_DATA:{
            const {pollingChatUID, pollingIntervalID} = action.payload;

            return {
                ...state,
                pollingIntervalID,
                pollingChatUID
            }
        }
        case types.CLEAR_CHAT_POLLING_DATA:{
            const {pollingIntervalID} = action.payload;
            clearInterval(pollingIntervalID);

            return {
                ...state,
                pollingIntervalID: null,
                pollingChatUID: null
            }
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