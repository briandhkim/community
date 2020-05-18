import React, {Component} from 'react';
import {connect} from 'react-redux';

import SearchPeopleMain from '../social/searchPeopleMain';

class AppBody extends Component {

    render() {
        const {showSearchPeople} = this.props;

        if (showSearchPeople) {
            return <SearchPeopleMain />
        }

        return (
            <div className="container white-text">
                <h1>Main content </h1>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        showSearchPeople: state.mainBody.showSearchPeople
    };
}

export default connect(mapStateToProps, {})(AppBody);