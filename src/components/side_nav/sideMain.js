import React, {Component} from 'react';
import M from 'materialize-css/dist/js/materialize.min';

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
                        <div className="collapsible-header pl-2r">
                            <i className="material-icons">people</i>
                            Friends
                        </div>
                        <div className="collapsible-body">Friends body</div>
                    </li>
                    <li>
                        <div className="collapsible-header pl-2r">
                            <i className="material-icons">chat</i>
                            Chat
                        </div>
                        <div className="collapsible-body">Chat body</div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default SideMain;