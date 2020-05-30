import React, {Component} from 'react';
import {connect} from 'react-redux';

import MaterialIcon from '../util/materialIcon';

class CollapsibleFriendsList extends Component {

    renderList() {
        const {friends} = this.props;

        if (!friends) {
            return (
                <div className="font-secondary bg-primary-light white-text">
                    No friends to show.
                </div>
            );
        }

        return Object.keys(friends).map(key => {
            const f = friends[key];
            return (
                <a href="#!" className="collection-item font-secondary" key={key}>
                    <MaterialIcon icon={"account_box"} styleClass={"align-v mr-8"} />
                    {f.firstName} {f.lastName}
                </a>
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
                <div className="sideNavFriendsList collapsible-body collection p-0 max-h-300 overflow-y-auto custom-scroll-bar">
                    {this.renderList()}
                </div>
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