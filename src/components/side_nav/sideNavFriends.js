import React, {Component} from 'react';
import {connect} from 'react-redux';

import {showSearchPeople, loadFriendsByUID} from '../../actions/index';

import MaterialIcon from '../util/materialIcon';

class SideNavFriends extends Component {

    componentDidMount() {
        const {user, friends} = this.props;
        if (user) {
            if (user.uid && !friends) {
                this.props.loadFriendsByUID(user.uid);
            }
        }
    }

    render() {
        return(
            <React.Fragment>
                <div className="collapsible-header pl-2r font-primary">
                    <MaterialIcon icon={"people"} />
                    Friends
                </div>
                <div className="collapsible-body px-0 pt-0">
                    <button className="font-secondary w-full btn btn-secondary waves-effect waves-light" onClick={this.props.showSearchPeople}>
                        Search People
                        <MaterialIcon icon={"search"} styleClass="align-v" />
                    </button>
                    <div className="p-2r">
                        <ul className="">
                            <li>person a</li>
                            <li>person b</li>
                            <li>person c</li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state;
    return {
        friends: user.friends,
        user: user.user
    };
}

export default connect(mapStateToProps, {showSearchPeople, loadFriendsByUID})(SideNavFriends);