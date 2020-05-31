import React, {Component} from 'react';
import {connect} from 'react-redux';

import M from 'materialize-css/dist/js/materialize.min';

import MaterialIcon from '../util/materialIcon';
import FriendRequestReceivedAction from '../util/friendRequestReceivedAction';

class CollapsibleFriendRequest extends Component {

    componentDidUpdate() {
        const elem = document.querySelectorAll(".tooltipped");
        const margin = 0.1;
        const transitionMovement = 2;
        M.Tooltip.init(elem, {margin, transitionMovement});
    }

    renderList() {
        const {friendRequestFromUsers} = this.props;

        if (!friendRequestFromUsers) {
            return (
                <div className="font-secondary bg-primary-light white-text">
                    No friend requests.
                </div>
            );
        }

        return Object.keys(friendRequestFromUsers).map(key => {
            const reqUser = friendRequestFromUsers[key];
            return(
                <li className="collection-item font-secondary text-primary-light" key={key}>
                    <MaterialIcon icon={"person_add"} styleClass={"align-v mr-8"} />
                    {reqUser.firstName} {reqUser.lastName}
                    <FriendRequestReceivedAction targetUID={reqUser.uid} />
                </li>
            );
        });
    }

    render() {
        const {friendRequestFromUsers} = this.props;

        let numRequests = 0;

        if (friendRequestFromUsers) {
            numRequests = Object.keys(friendRequestFromUsers).length;
        }
        return (
            <React.Fragment>
                <div className="collapsible-header bg-primary white-text">
                    <div className="col s10 font-primary">
                        <MaterialIcon icon={"group_add"} styleClass={"align-v"}/>
                        Friend requests
                    </div>
                    <div className="col s2 text-secondary right-align">
                        {numRequests}
                    </div>
                </div>
                <ul className="sideNavFriendRequestList collapsible-body collection p-0 max-h-300 overflow-y-auto custom-scroll-bar">
                    {this.renderList()}
                </ul>
            </React.Fragment>
        );

    }
}

function mapStateToProps(state) {
    const {social} = state;

    return {
        friendRequestFromUsers  : social.friendRequestFromUsers
    };
}

export default connect(mapStateToProps, {})(CollapsibleFriendRequest)