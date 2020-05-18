import React from 'react';

const MaterialIcon = (props) => {
    const {icon, styleClass} = props;

    const styles = styleClass !== undefined ? styleClass : "";

    return (
        <i className={`material-icons ${styles}`}>{icon}</i>
    );
}

export default MaterialIcon;