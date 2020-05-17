import React from 'react';

const MobileUserNavbarCollection = (props) => {
    const user = {...props.user};

    function logOutHandler() {
        props.logOut();
        props.hideMobileNav();
    }

    return (
        <React.Fragment>
            <li className="font-secondary">
                <a href="#!" onClick={logOutHandler}> Log out </a>
            </li>
            <li className="font-secondary px-r2 white-text">
                Hi, {user.firstName}
            </li>
        </React.Fragment>
    );
}

export default MobileUserNavbarCollection;