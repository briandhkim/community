import React, {Component} from 'react';
import {connect} from 'react-redux';

class ChatContainer extends Component {

    render() {

        return (
            <div className="container chatMain">
                Chat Main
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {chat, user} = state;

    return {
        activeChat: chat.activeChat,
        user: user.user
    };
}

export default connect(mapStateToProps, {})(ChatContainer);