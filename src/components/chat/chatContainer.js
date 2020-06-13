import React, {Component} from 'react';
import {connect} from 'react-redux';

class ChatContainer extends Component {

    render() {

        return (
            <div className="container chatMain mt-05r h-600 m-h-850 bg-primary">
                Chat Main
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