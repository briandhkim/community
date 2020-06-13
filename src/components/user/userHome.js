import React, {Component} from 'react';

import SideMain from '../side_nav/sideMain';
import AppBody from '../main_body/appBody';

class UserHome extends Component {
    render() {

        return(
            <div className="m-min-h-800">
                <div className="row h-full mb-0">
                    <div className="col s12 m4 l3 h-full grey lighten-4 sideNavWrapper">
                        <SideMain />
                    </div>
                    <div className="col s12 m8 l9 h-full white overflow-y-auto appBodyWrapper">
                        <AppBody />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserHome;