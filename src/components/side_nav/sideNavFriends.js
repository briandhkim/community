import React, {Component} from 'react';

import MaterialIcon from '../util/materialIcon';

class SideNavFriends extends Component {


    render() {
        return(
            <React.Fragment>
                <div className="collapsible-header pl-2r">
                    <MaterialIcon icon={"people"} />
                    Friends
                </div>
                <div className="collapsible-body">Friends body</div>
            </React.Fragment>
        );
    }
}

export default SideNavFriends;