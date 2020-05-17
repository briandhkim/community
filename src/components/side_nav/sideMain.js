import React, {Component} from 'react';
import M from 'materialize-css/dist/js/materialize.min';

import SideNavFriends from './sideNavFriends';
import SideNavChat from './sideNavChat';

class SideMain extends Component {

    componentDidMount() {
        const elems = document.querySelector(".collapsible");
        M.Collapsible.init(elems, {
            accordion: false
        });
    }

    render() {

        return (
            <div>
                <ul className="collapsible">
                    <li>
                        <SideNavFriends />
                    </li>
                    <li>
                        <SideNavChat />
                    </li>
                </ul>
            </div>
        );
    }
}

export default SideMain;