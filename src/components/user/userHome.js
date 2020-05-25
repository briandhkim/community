import React, {Component} from 'react';

import SideMain from '../side_nav/sideMain';
import AppBody from '../main_body/appBody';

class UserHome extends Component {
    render() {

        return(
            <div className="m-h-90">
                <div className="row h-full">
                    <div className="col s12 m4 l3 h-full grey lighten-4">
                        <SideMain />
                    </div>
                    <div className="col s12 m8 l9 h-full white">
                        <AppBody />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserHome;