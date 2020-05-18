import React from 'react';

import MaterialIcon from '../util/materialIcon';

const MobileUserNavbarCollection = (props) => {
    const user = {...props.user};

    function logOutHandler() {
        props.logOut();
        props.hideMobileNav();
    }

    return (
        <React.Fragment>
            <li className="font-secondary px-r2 white-text mt-20">
                Signed in as
                <span className="font-primary text-bold text-secondary block">
                <MaterialIcon icon={"face"} styleClass="align-v mr-8" />
                    {user.firstName} {user.lastName}
                </span>
            </li>
            <li className="divider" tabIndex="-1"></li>
            <li className="font-secondary">
                <a href="#!" onClick={logOutHandler}> Log out </a>
            </li>
        </React.Fragment>
    );
}

export default MobileUserNavbarCollection;