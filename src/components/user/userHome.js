import React, {Component} from 'react';

import SideMain from '../side_nav/sideMain';
import AppBody from '../main_body/appBody';

class UserHome extends Component {
    render() {

        return(
            <div className="m-h-90">
                <div className="row h-full">
                    <div className="col s12 m4 l3 white h-full">
                        <SideMain />
                    </div>
                    <div className="col s12 m8 l9 bg-primary-dark h-full">
                        <AppBody />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserHome;