import React, {Component} from 'react';
import {connect} from 'react-redux';

import MaterialIcon from '../util/materialIcon';

class FriendRequest extends Component {

    render() {
        return (
            <ul className="collapsible">
                
            </ul>
        );
    }
}

function mapStateToProps(state) {
    const {social} = state;

    return {
        friendRequestFromUsers  : social.friendRequestFromUsers
    };
}

export default connect(mapStateToProps, {})(FriendRequest)