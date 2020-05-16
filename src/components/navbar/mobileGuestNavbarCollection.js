import React from 'react';
import {Link} from 'react-router-dom';

const MobileGuestNavbarCollection = (props) => {
    
    return (
        <React.Fragment>
            <li className="font-secondary">
                <Link to="/login" onClick={props.hideMobileNav} > Log in </Link>
            </li>
            <li className="font-secondary"><a href="/">item 2</a></li>
            <li className="font-secondary"><a href="/">item 3</a></li>
        </React.Fragment>
    );
}

export default MobileGuestNavbarCollection;