import React, {Component} from 'react';
import {connect} from 'react-redux';

import {showSearchPeopleWindow, loadFriendsByUID, loadFriendRequestDataByUID} from '../../actions/index';

import MaterialIcon from '../util/materialIcon';
import CollapsibleFriendsList from './collapsibleFriendsList';
import CollapsibleFriendRequest from './collapsibleFriendRequest';

class SideNavFriends extends Component {
    
    loadFriendData() {
        const {user, friends, friendRequestSentToUsers, friendRequestFromUsers} = this.props;

        if (user.uid) {
            if (!friends) {
                this.props.loadFriendsByUID(user.uid);
            }
            if (!friendRequestFromUsers || !friendRequestSentToUsers) {
                this.props.loadFriendRequestDataByUID(user.uid);
            }
        }
    }

    render() {
        const {user, shouldRefreshFriendData, shouldRefreshFriendRequestData} = this.props;

        if (user) {
            // console.log("sideNavFriends - in render");
            this.loadFriendData();
        } 
        if (shouldRefreshFriendData) {
            this.props.loadFriendsByUID(user.uid);
        }
        if (shouldRefreshFriendRequestData) {
            this.props.loadFriendRequestDataByUID(user.uid);
        }
        
        return(
            <React.Fragment>
                <div className="collapsible-header pl-2r font-primary bg-primary-light white-text">
                    <MaterialIcon icon={"people"} />
                    Social
                </div>
                <div className="collapsible-body px-0 pt-0 pb-0 grey lighten-3">
                    <button className="font-secondary w-full btn btn-secondary waves-effect waves-light" onClick={this.props.showSearchPeopleWindow}>
                        Search People
                        <MaterialIcon icon={"search"} styleClass="align-v" />
                    </button>
                    <div className="p-05r">
                        <ul className="collapsible">
                            <li className="active">
                                <CollapsibleFriendsList />
                            </li>
                            <li className="">
                                <CollapsibleFriendRequest />
                            </li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const {user, social} = state;
    return {
        user                            : user.user,
        friends                         : social.friends,
        friendRequestSentToUsers        : social.friendRequestSentToUsers,
        friendRequestFromUsers          : social.friendRequestFromUsers,
        shouldRefreshFriendData         : social.shouldRefreshFriendData,
        shouldRefreshFriendRequestData  : social.shouldRefreshFriendRequestData
    };
}

export default connect(mapStateToProps, {showSearchPeopleWindow, loadFriendsByUID, loadFriendRequestDataByUID})(SideNavFriends);