import React, {Component} from 'react';
import {connect} from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min';

import {sendFriendRequest, acceptFriendRequest, rejectFriendRequest} from '../../actions/index';

import MaterialIcon from '../util/materialIcon';
import FriendRequestReceivedAction from '../util/friendRequestReceivedAction';

class SearchPeopleResult extends Component {
    constructor(props) {
        super(props);

        this.sendFriendRequest = this.sendFriendRequest.bind(this);
    }

    componentDidUpdate() {
        const elem = document.querySelectorAll(".tooltipped");
        M.Tooltip.init(elem, {
            margin: 1,
            transitionMovement: 1
        });
    }

    sendFriendRequest(recipientUID) {
        const {user} = this.props;

        this.props.sendFriendRequest(user.uid, recipientUID);
    }

    renderListSecondaryComponent(uid) {
        const {user, friends, friendRequestFromUsers, friendRequestSentToUsers} = this.props;

        const sendFriendRequestHandler = (e) => {
            const btn = e.currentTarget;
            btn.classList.add("disabled");
            this.sendFriendRequest(uid);
        };
        let secondary = <button className="secondary-content tooltipped btn-flat p-0" onClick={sendFriendRequestHandler} data-position="left" data-tooltip="Add friend" >
                            <MaterialIcon icon={"person_add"} styleClass={""} />
                        </button>;

        if (friends[uid]) {
            secondary = <span className="new badge font-secondary" data-badge-caption="Friend">
                            <MaterialIcon icon={"check"} styleClass={""} />
                        </span>;
        }
        if (friendRequestFromUsers[uid]) {
            secondary = <FriendRequestReceivedAction fromUID={uid} toUID={user.uid} acceptAction={this.props.acceptFriendRequest} rejectAction={this.props.rejectFriendRequest} />;
        }
        if (friendRequestSentToUsers[uid]) {
            secondary = <span className="new badge font-secondary" data-badge-caption="Request sent">
                            <MaterialIcon icon={"mail"} styleClass={""} />
                        </span>;
        }
        if (user.uid === uid) {
            secondary = <span className="new badge font-secondary" data-badge-caption="You">
                            <MaterialIcon icon={"face"} styleClass={""} />
                        </span>;
        }
        return secondary;
    }

    renderResultList() {
        const {searchResultUsers} = this.props;

        const list = searchResultUsers.map((su, idx) => {
            return (
                <li className="collection-item font-primary text-h6" key={idx}>
                    <MaterialIcon icon={"person_outline"} styleClass="align-v mr-8" />
                    {su.firstName} {su.lastName}
                    {this.renderListSecondaryComponent(su.uid)}
                </li>
            );
        });

        return (
            <ul className="collection searchPeopleResults z-depth-2">
                {list}
            </ul>
        );
    }

    render() {
        const {searchResultUsers} = this.props;

        if (searchResultUsers !== null && !searchResultUsers.length) {
            const queryVal = document.getElementById("searchPeopleQuery").value;

            return (
                <div className="text-h5 font-tertiary col s12 noResultsFoundDisplay">
                    <MaterialIcon icon={"info"} styleClass={"text-info text-h4 align-v mr-8"} />
                    Sorry, no users were found for "{queryVal}"
                </div>
            );
        } else if (searchResultUsers !== null && searchResultUsers.length) {
            return this.renderResultList();
        }

        return(
            <div></div>
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
        searchResultUsers               : social.searchPeopleResultUsers
    };
}

export default connect(mapStateToProps, { 
    sendFriendRequest, 
    acceptFriendRequest,
    rejectFriendRequest
})(SearchPeopleResult);