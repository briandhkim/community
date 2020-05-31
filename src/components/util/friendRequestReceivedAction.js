import React from 'react';

import MaterialIcon from './materialIcon';

const FriendRequestReceivedAction = (props) => {


    return (
        <React.Fragment>
            <a href="#!" className="secondary-content text-error tooltipped" data-position="right" data-tooltip="Decline request">
                <MaterialIcon icon={"clear"} />
            </a>
            <a href="#!" className="secondary-content mr-5 text-success tooltipped" data-position="left" data-tooltip="Accept request">
                <MaterialIcon icon={"check"} />
            </a>
        </React.Fragment>
    );
}

export default FriendRequestReceivedAction;