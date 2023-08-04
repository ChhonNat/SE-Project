import React from "react";

const LabelRequire = (props) => {
    const { label, color } = props;
    const customColor = { red: '#d32f2f' }

    return (
        <span style={{color: color ? customColor[color] || color : ''}}>{label} <b style={{ color: 'red' }}>*</b></span>
    )
}

export default LabelRequire;