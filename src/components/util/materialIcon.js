import React from 'react';

const MaterialIcon = (props) => {
    const {icon} = props;
    const {styleClass} = props;

    return (
        <i className={`material-icons ${styleClass}`}>{icon}</i>
    );
}

export default MaterialIcon;