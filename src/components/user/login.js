import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../actions/index';

class Login extends Component {

    componentDidMount() {
        this.props.getUser();
    }

    render() {
        const {user} = this.props;

        return (
            <div className="container">
                <div className="row min-h-400 valign-wrapper">
                    <h1>Login Page</h1>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps, {getUser})(Login);