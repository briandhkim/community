import React from 'react';

import MaterialIcon from '../util/materialIcon';

const FriendsList = (props) => {
    const {friends} = props;

    const list = Object.keys(friends).map(key => {
        const f = friends[key];
        return (
            <a href="#!" className= "collection-item" key={key}>
                <MaterialIcon icon={"account_box"} styleClass="align-v mr-8" />
                {f.firstName} {f.lastName}
            </a>
        );
    });
    const numFriends = Object.keys(friends).length;

    return (
        <div className="collection with-header sideNavFriendsList">
            <div className="collection-header font-tertiary">
                <MaterialIcon icon={"people"} styleClass={"align-v"} /> Friends
                <span className="secondary-content badge">
                    {numFriends}
                </span>
            </div>
            <div className="m-max-h-250 overflow-x-auto custom-scroll-bar font-primary">
                {list}
            </div>
        </div>
    );
}

export default FriendsList;