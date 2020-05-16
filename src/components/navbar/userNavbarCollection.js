import React from 'react';
import {Link} from 'react-router-dom';

const UserNavbarCollection = (props) => {
    const user = {...props.user};

    return (
        <React.Fragment>
            <li className="font-secondary">
                <Link to="/" > Log out </Link>
            </li>
            <li className="font-secondary">
                Hi, {user.firstName}
            </li>
        </React.Fragment>
    );
}

export default UserNavbarCollection;