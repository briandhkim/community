import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getLoggedInUser} from '../actions/index';

import UserHome from './user/userHome';
import GuestLanding from './landing/guestLanding';

class Home extends Component {

    constructor(props) {
        super(props);

        this.props.getLoggedInUser();
    }

    render() {
        const {isLoggedIn} = this.props;

        if (isLoggedIn) {
            return <UserHome />
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

export default connect(mapStateToProps, {getLoggedInUser})(Home);