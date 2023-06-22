import React from "react";

const LabelRequire = (props) => {
    const { label } = props;

    return (
        <span>{label} <b style={{ color: 'red' }}>*</b></span>
    )
}

export default LabelRequire;