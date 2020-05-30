import React, {Component} from 'react';
import {connect} from 'react-redux';

import MaterialIcon from '../util/materialIcon';

class CollapsibleFriendRequest extends Component {

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
                <a href="#!" className="collection-item" key={key}>
                    <MaterialIcon icon={"account_box"} styleClass={"align-v mr-8"} />
                    {reqUser.firstName} {reqUser.lastName}
                </a>
            );
        });
    }

    render() {
        const {friendRequestFromUsers} = this.props;
        console.log(friendRequestFromUsers);

        let numRequests = 0;

        if (friendRequestFromUsers) {
            numRequests = Object.keys(friendRequestFromUsers).length;
        }
        return (
            <React.Fragment>
                <div className="collapsible-header font-secondary pb-r05 bg-primary white-text">
                    <div className="col s10">
                        <MaterialIcon icon={"people"} styleClass={"align-v"}/>
                        Friend requests
                    </div>
                    <div className="col s2 text-secondary right-align">
                        {numRequests}
                    </div>
                </div>
                <div className="collapsible-body collection p-0 max-h-300 overflow-y-auto custom-scroll-bar">
                    {this.renderList()}
                </div>
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