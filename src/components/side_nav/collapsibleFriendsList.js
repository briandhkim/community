import React, {Component} from 'react';
import {connect} from 'react-redux';

import M from 'materialize-css/dist/js/materialize.min';

import MaterialIcon from '../util/materialIcon';
import FriendListAction from '../util/friendListAction';

class CollapsibleFriendsList extends Component {
    
    componentDidUpdate() {
        const elem = document.querySelectorAll(".tooltipped");
        const margin = 0.1;
        const transitionMovement = 2;
        M.Tooltip.init(elem, {margin, transitionMovement});
    }

    renderList() {
        const {friends} = this.props;

        if (!friends || Object.keys(friends).length === 0) {
            return (
                <div className="font-secondary bg-primary-light white-text p-1r">
                    No friends to show.
                </div>
            );
        }

        return Object.keys(friends).map(key => {
            const f = friends[key];
            return (
                <li className="collection-item font-secondary" key={key}>
                    <MaterialIcon icon={"account_box"} styleClass={"align-v mr-8"} />
                    {f.firstName} {f.lastName}
                    <FriendListAction />
                </li>
            );
        });
    }

    render() {
        const {friends} = this.props;

        let numFriends = 0;
        
        if (friends) {
            numFriends = Object.keys(friends).length;
        }
        return (
            <React.Fragment>
                <div className="collapsible-header bg-primary white-text">
                    <div className="col s10 font-primary">
                        <MaterialIcon icon={"people"} styleClass={"align-v"}/>
                        Friends
                    </div>
                    <div className="col s2 text-secondary right-align">
                        {numFriends}
                    </div>
                </div>
                <ul className="sideNavFriendsList collapsible-body collection p-0 max-h-300 overflow-y-auto custom-scroll-bar">
                    {this.renderList()}
                </ul>
            </React.Fragment>
        );
        
    }
}

function mapStateToProps(state) {
    const {social} = state;

    return {
        friends : social.friends
    };
}

export default connect(mapStateToProps, {})(CollapsibleFriendsList);