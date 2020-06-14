import React from 'react';

import MaterialIcon from '../util/materialIcon';

const ChatBody = (props) => {
    const {user, messages} = props;

    const noMessages = () => {
        return (
            <div className="font-primary text-h4">
                No messages to show
            </div>
        );
    }

    return (
        <div className="chat-body row blue-grey lighten-5 p-105r mb-0 min-h-500">
            {messages.length ? "" : noMessages()}
        </div>
    );
};

export default ChatBody;