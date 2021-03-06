import React from 'react';

import MaterialIcon from './materialIcon';

const FriendListAction = (props) => {
    const {user, friend, openDM} = props;

    const chatAction = () => {
        openDM(user.uid, friend.uid);
    };

    return (
        <React.Fragment>
            <button className="secondary-content tooltipped btn-flat p-0" data-position="right" data-tooltip="Details">
                <MaterialIcon icon={"settings"} />
            </button>
            <button className="secondary-content mr-5 tooltipped btn-flat p-0" onClick={chatAction} data-position="right" data-tooltip="Chat">
                <MaterialIcon icon={"chat"} />
            </button>
        </React.Fragment>
    );
}

export default FriendListAction;