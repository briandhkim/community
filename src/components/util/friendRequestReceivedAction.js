import React from 'react';

import MaterialIcon from './materialIcon';

const FriendRequestReceivedAction = (props) => {
    const {fromUID, toUID, acceptAction, rejectAction} = props;

    const acceptHandler = (e) => {
        const btn = e.currentTarget;
        btn.classList.add("disabled");
        disableButtons();

        acceptAction(fromUID, toUID);
    };
    const rejectHandler = (e) => {
        const btn = e.currentTarget;
        btn.classList.add("disabled");
        disableButtons();

        rejectAction(fromUID, toUID);
    };

    function disableButtons() {
        const ae = document.getElementsByClassName(`accept${fromUID}`);
        const re = document.getElementsByClassName(`reject${fromUID}`);

        for (let i=0; i<ae.length; i++) {
            ae[i].classList.add("disabled");
            re[i].classList.add("disabled");
        }
    }

    return (
        <React.Fragment>
            <button className={`reject${fromUID} secondary-content text-error tooltipped btn-flat p-0`} onClick={rejectHandler} data-position="right" data-tooltip="Decline request">
                <MaterialIcon icon={"clear"} />
            </button>
            <button className={`accept${fromUID} secondary-content mr-5 text-success tooltipped btn-flat p-0`} onClick={acceptHandler} data-position="left" data-tooltip="Accept request">
                <MaterialIcon icon={"check"} />
            </button>
        </React.Fragment>
    );
}

export default FriendRequestReceivedAction;