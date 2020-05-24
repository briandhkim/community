import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getLoggedInUser, showSearchPeopleWindow, loadFriendsByUID} from '../../actions/index';

import MaterialIcon from '../util/materialIcon';
import FriendsList from './friendsList';

class SideNavFriends extends Component {
    
    loadFriendList() {
        const {user, friends} = this.props;

        if (user) {
            if (user.uid && !friends) {
                this.props.loadFriendsByUID(user.uid);
            }
        }
    }

    render() {
        const {user, friends} = this.props;

        if (user) {
            this.loadFriendList();
        } 
        const friendsList = friends ? <FriendsList friends={friends} /> : "";
        
        return(
            <React.Fragment>
                <div className="collapsible-header pl-2r font-primary">
                    <MaterialIcon icon={"people"} />
                    Friends
                </div>
                <div className="collapsible-body px-0 pt-0 bg-primary">
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
    const {user} = state;
    return {
        friends: user.friends,
        user: user.user
    };
}

export default connect(mapStateToProps, {getLoggedInUser, showSearchPeopleWindow, loadFriendsByUID})(SideNavFriends);