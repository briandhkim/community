import React from 'react';

const UserNavbarCollection = (props) => {
    const user = {...props.user};

    return (
        <React.Fragment>
            <li className="font-secondary">
                {
                    // eslint-disable-next-line 
                }
                <a href="#!" onClick={props.logOut} > Log out </a>
            </li>
            <li className="font-secondary px-8">
                Hi, {user.firstName}
            </li>
        </React.Fragment>
    );
}

export default UserNavbarCollection;