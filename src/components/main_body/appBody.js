import React, {Component} from 'react';
import {connect} from 'react-redux';

import SearchPeopleMain from '../social/searchPeopleMain';

class AppBody extends Component {

    render() {
        const {showSearchPeopleWindow} = this.props;

        if (showSearchPeopleWindow) {
            return <SearchPeopleMain />
        }

        return (
            <div className="container">
                <div className="col s10 mt-2r">
                    <h1 className="font-primary text-h2 mt-0">Main content </h1>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {mainBody} = state;
    return{
        showSearchPeopleWindow: mainBody.showSearchPeopleWindow
    };
}

export default connect(mapStateToProps, {})(AppBody);