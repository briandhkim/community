import React, {Component} from 'react';
import {connect} from 'react-redux';

import ChatHeader from './chatHeader';
import ChatBody from './chatBody';

class ChatContainer extends Component {

    render() {
        const {chat, user, chatMessages} = this.props;

        return (
            <div className="container chatMain mt-05r z-depth-3">
                <ChatHeader chat={chat} user={user} />
                <ChatBody user={user} messages={chatMessages} />
                <div className="row bg-primary-light min-h-100">

                </div>
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