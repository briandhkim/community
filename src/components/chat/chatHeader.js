import React from 'react';

import MaterialIcon from '../util/materialIcon';

const ChatHeader = (props) => {
    const {chat, user} = props;
    const cUsers = chat.users;

    let commaIdx = 0;
    const chatUsers = Object.keys(cUsers).map(key => {
        
        let uLabel = '';
        if (key !== user.uid) {
            const u = cUsers[key];
            uLabel = `${commaIdx++ ? ',': ''} ${u.firstName} ${u.lastName}`
        }

        return (
            <React.Fragment key={key}>
                {uLabel}
            </React.Fragment>
        );
    });


    return (
        <div className="chat-header row bg-primary bg-primary mb-0">
            <div className="white-text text-h5 px-r2 py-r05 border-b-10 border-primary-dark font-secondary">
                <MaterialIcon icon={"chat"} styleClass={"align-v mr-8"} />
                {chatUsers}
            </div>
        </div>
    );
};

export default ChatHeader;