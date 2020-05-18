import React, { useEffect } from 'react';

import M from 'materialize-css/dist/js/materialize.min';

import MaterialIcon from '../util/materialIcon';

const UserNavbarCollection = (props) => {
    const user = {...props.user};

    useEffect(() => {
        const elems = document.querySelector(".dropdown-trigger");
        M.Dropdown.init(elems, {
            coverTrigger: false
        });
    });

    return (
        <React.Fragment>
            <li className="font-secondary">
                <a href="#!" className="dropdown-trigger" data-target="userNavDropdown">
                    <MaterialIcon icon={"face"} />
                </a>
            </li>

            <ul id="userNavDropdown" className="dropdown-content min-w-200">
                <li className="font-secondary navDropText px-r1 py-8" >
                    Signed in as
                    <span className="font-primary text-bold text-primary-light p-0">
                        {user.firstName} {user.lastName}
                    </span>
                </li>
                <li className="divider" tabIndex="-1"></li>
                <li className="font-secondary text-primary-light">
                    {
                        // eslint-disable-next-line 
                    }
                    <a href="/" onClick={props.logOut} > Log out </a>
                </li>
            </ul>
        </React.Fragment>
    );
}

export default UserNavbarCollection;