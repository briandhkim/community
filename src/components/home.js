import React, {Component} from 'react';
import {connect} from 'react-redux';

import UserLanding from './landing/userLanding';
import GuestLanding from './landing/guestLanding';

class Home extends Component {
    render() {
        const {isLoggedIn} = this.props;

        if (isLoggedIn) {
            return <UserLanding />
        }
        return <GuestLanding />
        
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.user
    }
}

export default connect(mapStateToProps, {})(Home);