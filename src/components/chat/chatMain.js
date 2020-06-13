import React, {Component} from 'react';
import {connect} from 'react-redux';

import BodyDefaultCircleLoader from '../main_body/bodyDefaultCircleLoader';
import ChatContainer from './chatContainer';

class ChatMain extends Component {

    render() {
        const {activeChat} = this.props;

        if (activeChat) {    
            return <ChatContainer />
        } else {
            return <BodyDefaultCircleLoader />
        }
    }
}

function mapStateToProps(state) {
    const {chat} = state;

    return {
        activeChat: chat.activeChat
    };
}

export default connect(mapStateToProps, {})(ChatMain);