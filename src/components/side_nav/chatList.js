import React, {Component} from 'react';
import {connect} from 'react-redux';

class ChatList extends Component {

    renderChatLabel(chat) {
        let label = chat.name;

        if (!label.length) {
            const {user} = this.props;
            const cUsers = chat.users;

            let commaIdx = 0;
            label = Object.keys(cUsers).map(key => {
                
                let uLabel = '';
                if (key !== user.uid) {
                    const u = cUsers[key];
                    uLabel = `${commaIdx++ ? ',': ''} ${u.firstName} ${u.lastName}`;
                }

                return uLabel;
            });
        }

        return label;
    }
 
    renderList() {
        const {chatList} = this.props;

        return Object.keys(chatList).map(key => {
            const chat = chatList[key];

            return (
                <li className="collection-item font-secondary" key={key}>
                    {this.renderChatLabel(chat)}
                </li>
            );
        });
    }

    render() {
        const {chatList} = this.props;

        if (chatList && Object.keys(chatList).length) {
            return (
                <React.Fragment>
                    {this.renderList()}
                </React.Fragment>
            );
        } else {
            return (
                <div>
                    No active chat to show
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    const {chat, user} = state;

    return {
        user        : user.user,
        chatList    : chat.availableChatList
    };
}

export default connect(mapStateToProps, {})(ChatList);