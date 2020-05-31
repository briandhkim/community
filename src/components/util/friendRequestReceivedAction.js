import React from 'react';

import MaterialIcon from './materialIcon';

const FriendRequestReceivedAction = (props) => {


    return (
        <React.Fragment>
            <button className="secondary-content text-error tooltipped btn-flat p-0" data-position="right" data-tooltip="Decline request">
                <MaterialIcon icon={"clear"} />
            </button>
            <button className="secondary-content mr-5 text-success tooltipped btn-flat p-0" data-position="left" data-tooltip="Accept request">
                <MaterialIcon icon={"check"} />
            </button>
        </React.Fragment>
    );
}

export default FriendRequestReceivedAction;