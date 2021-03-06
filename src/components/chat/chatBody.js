import React, {useEffect, useState} from 'react';
import M from 'materialize-css/dist/js/materialize.min';

const ChatBody = (props) => {
    const {user, chat, messages} = props;

    const [chatUID, setChatUID] = useState('');

    useEffect(() => {
        // showLatestMessage();

        const elem = document.querySelectorAll(".tooltipped");
        M.Tooltip.init(elem, {});
    });

    useEffect(() => {
        const messages = document.querySelectorAll('.user-msg-container');
        const chatbody = document.querySelector('.chat-body');

        if (chat.uid === chatUID) {
            return;
        } else {
            setChatUID(chat.uid);
        }


        if (messages.length) {
            const latestMessage = messages[messages.length-1];
            
            chatbody.scrollTo(0, latestMessage.offsetTop);
        }
    }, [chat, chatUID]);

    const showLatestMessage = () => {
        const messages = document.querySelectorAll('.user-msg-container');
        const chatbody = document.querySelector('.chat-body');

        const innerHeight = chatbody.scrollHeight;
        const bottom = innerHeight - 550;

        // console.log(chatbody.scrollTop);
        // console.log(bottom);
        console.log('xxxxxxxxx')
        if (chatUID === chat.uid) {
            return;
        }

        setChatUID(chat.uid);

        if (messages.length) {
            const latestMessage = messages[messages.length-1];
            
            chatbody.scrollTo(0, latestMessage.offsetTop);
        }
    };

    const noMessages = () => {
        return (
            <div className="font-primary text-h4">
                No messages to show
            </div>
        );
    };

    const messageLeft = (m, idx) => {
        return (
            <div className="col s11 m9 l7 mb-1r user-msg-container" key={idx}>
                <div className="col s12 l10 mb-5">
                    <div className="p-10 inline-block min-w-100 tooltipped font-primary bg-primary-light text-secondary rounded-5 z-depth-2" data-position="bottom" data-tooltip={`${m.dateCreated}`}>
                        {m.text}
                    </div>
                </div>
                <div className="col s6 font-tertiary">
                    <span className="chip">
                        {m.user.firstName} {m.user.lastName}
                    </span>
                </div>
            </div>
        );
    };

    const messageRight = (m, idx) => {
        return (
            <div className="col s11 offset-s1 m9 offset-m3 l7 offset-l5 mb-1r right-align user-msg-container" key={idx}>
                <div className="col s12 l10 offset-l2 mb-5">
                    <div className="p-10 inline-block min-w-100 tooltipped font-primary left-align blue darken-2 white-text rounded-5 z-depth-2" data-position="bottom" data-tooltip={`${m.dateCreated}`}>
                        {m.text}
                    </div>
                </div>
                <div className="col s6 offset-s6 font-tertiary">
                    <span className="chip">
                        You
                    </span>
                </div>
            </div>
        );
    };

    const renderMessages = messages.reverse().map((m, idx) => {
        const uSentBy = m.user;

        if (uSentBy.uid === user.uid) {
            return messageRight(m, idx);
        } else {
            return messageLeft(m, idx);
        }
    });

    return (
        <div className="chat-body row blue-grey lighten-5 p-105r mb-0 min-h-500 overflow-y-auto custom-scroll-bar max-h-550" tabIndex="0">
            {messages.length ? renderMessages : noMessages()}
        </div>
    );
};

export default ChatBody;