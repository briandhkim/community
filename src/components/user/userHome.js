import React, {Component} from 'react';

import SideMain from '../side_nav/sideMain';
import AppBody from '../main_body/appBody';

class UserHome extends Component {
    render() {

        return(
            <div className="xl-min-h-800 container">
                <div className="row h-full mb-0">
                    <div className="col s12 m6 l5 xl4 h-full  sideNavWrapper">
                        <SideMain />
                    </div>
                    <div className="col s12 m6 l7 xl8 h-full overflow-y-auto appBodyWrapper">
                        <AppBody />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserHome;