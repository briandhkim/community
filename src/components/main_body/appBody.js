import React, {Component} from 'react';
import {connect} from 'react-redux';

import ChatMain from '../chat/chatMain';
import SearchPeopleMain from '../social/searchPeopleMain';

class AppBody extends Component {

    render() {
        const {showChatWindow, showSearchPeopleWindow} = this.props;

        if (showChatWindow) {
            return <ChatMain />
        } else if (showSearchPeopleWindow) {
            return <SearchPeopleMain />
        } else {
            return (
                <div className="container">
                    <div className="col s10 mt-2r">
                        <h1 className="font-primary text-h2 mt-0">Main content </h1>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    const {mainBody} = state;
    return{
        showChatWindow          : mainBody.showChatWindow,
        showSearchPeopleWindow  : mainBody.showSearchPeopleWindow
    };
}

export default connect(mapStateToProps, {})(AppBody);