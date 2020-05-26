import React, {Component} from 'react';
import {connect} from 'react-redux';

import {showSearchPeopleWindow, loadFriendsByUID, loadFriendRequestDataByUID} from '../../actions/index';

import MaterialIcon from '../util/materialIcon';
import FriendsList from './friendsList';

class SideNavFriends extends Component {
    
    loadFriendData() {
        const {user, friends, friendRequestSentToUsers, friendRequestFromUsers} = this.props;

        if (user && user.uid) {
            if (!friends) {
                this.props.loadFriendsByUID(user.uid);
            }
            if (!friendRequestFromUsers || !friendRequestSentToUsers) {
                this.props.loadFriendRequestDataByUID(user.uid);
            }
        }
    }

    render() {
        const {user, friends} = this.props;

        if (user) {
            this.loadFriendData();
        } 
        const friendsList = friends ? <FriendsList friends={friends} /> : "";
        
        return(
            <React.Fragment>
                <div className="collapsible-header pl-2r font-primary bg-primary-light white-text">
                    <MaterialIcon icon={"people"} />
                    Friends
                </div>
                <div className="collapsible-body px-0 pt-0 grey lighten-3">
                    <button className="font-secondary w-full btn btn-secondary waves-effect waves-light" onClick={this.props.showSearchPeopleWindow}>
                        Search People
                        <MaterialIcon icon={"search"} styleClass="align-v" />
                    </button>
                    <div className="p-1r">
                        {friendsList}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const {user, social} = state;
    return {
        friends                     : social.friends,
        friendRequestSentToUsers    : social.friendRequestSentToUsers,
        friendRequestFromUsers      : social.friendRequestFromUsers,
        user                        : user.user
    };
}

export default connect(mapStateToProps, {showSearchPeopleWindow, loadFriendsByUID, loadFriendRequestDataByUID})(SideNavFriends);