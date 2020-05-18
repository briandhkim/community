import React, {Component} from 'react';

import MaterialIcon from '../util/materialIcon';

class SideNavChat extends Component {


    render() {
        return(
            <React.Fragment>
                <div className="collapsible-header pl-2r font-primary">
                    <MaterialIcon icon={"chat"} />
                    Chat
                </div>
                <div className="collapsible-body">Chat body</div>
            </React.Fragment>
        );
    }
}

export default SideNavChat;