import React, {Component} from 'react';
import {connect} from 'react-redux';

import MaterialIcon from '../util/materialIcon';

class CollapsibleFriendsList extends Component {

    renderList() {
        const {friends} = this.props;

        const list = Object.keys(friends).map(key => {
            const f = friends[key];
            return (
                <a href="#!" className="collection-item" key={key}>
                    <MaterialIcon icon={"account_box"} styleClass={"align-v mr-8"} />
                    {f.firstName} {f.lastName}
                </a>
            );
        });

        return list;
    }

    render() {
        const {friends} = this.props;
        
        if (friends) {
            const numFriends = Object.keys(friends).length;
            return (
                <React.Fragment>
                    <div className="collapsible-header font-secondary pb-r05 bg-primary white-text">
                        <div className="col s10">
                            <MaterialIcon icon={"people"} styleClass={"align-v"}/>
                            Friends
                        </div>
                        <div className="col s2 text-secondary">
                            {numFriends}
                        </div>
                    </div>
                    <div className="collapsible-body collection p-0 max-h-300 overflow-y-auto custom-scroll-bar">
                        {this.renderList()}
                    </div>
                </React.Fragment>
            );
        } else {
            return(
                <div className="collapsible-header font-secondary bg-primary white-text">
                    No friends to show.
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    const {social} = state;

    return {
        friends : social.friends
    };
}

export default connect(mapStateToProps, {})(CollapsibleFriendsList);