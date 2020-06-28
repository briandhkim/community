import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadAvailableChatList} from '../../actions/index';

import MaterialIcon from '../util/materialIcon';
import ChatList from './chatList';

class SideNavChat extends Component {

    render() {
        const {user, loadAvailableChatList} = this.props;

        if (user) {
            loadAvailableChatList(user.uid);
        }

        return(
            <React.Fragment>
                <div className="collapsible-header pl-2r font-primary bg-primary-light white-text">
                    <MaterialIcon icon={"chat"} />
                    Chat
                </div>
                <ul className="collapsible-body collection p-0 max-h-400 overflow-y-auto custom-scroll-bar">
                    <ChatList />
                </ul>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state;
    return {
        user        : user.user
    };
}

export default connect(mapStateToProps, {loadAvailableChatList})(SideNavChat);