import React from 'react';

const FriendsList = (props) => {
    const {friends} = props;
    // console.log(friends.length);

    const list = friends.map((friend, idx) => {
        return (
            <a href="#!" className="collection-item" key={idx}>
                {friend.firstName} {friend.lastName}
            </a>
        );
    });
    
    return (
        <div className="collection with-header sideNavFriendsList">
            <div className="collection-header font-tertiary">
                Friends
                <span className="secondary-content badge">
                    {friends.length}
                </span>
            </div>
            <div className="m-max-h-250 overflow-x-auto custom-scroll-bar font-primary">
                {list}
            </div>
        </div>
    );
}

export default FriendsList;