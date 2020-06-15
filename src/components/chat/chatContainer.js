import React, {Component} from 'react';
import {connect} from 'react-redux';

import ChatHeader from './chatHeader';
import ChatBody from './chatBody';
import MessageInput from './messageInput';

class ChatContainer extends Component {

    render() {
        const {chat, user, chatMessages} = this.props;

        return (
            <div className=" chatMain mt-05r z-depth-3">
                <ChatHeader chat={chat} user={user} />
                <ChatBody user={user} messages={chatMessages} />
                <MessageInput />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {chat, user} = state;

    return {
        chat            : chat.activeChat,
        chatMessages    : chat.activeChatMessages,
        user            : user.user
    };
}

export default connect(mapStateToProps, {})(ChatContainer);