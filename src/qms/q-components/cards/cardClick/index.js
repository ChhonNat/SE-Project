import { Typography } from '@mui/material';
import React from 'react';
import './style.css';

const CardClick = (props) => {
    return (
        <div onClick={props.handleClick} className="card">
            <Typography variant='h5'>
                {props.title ?? 'Click me'}
            </Typography>
        </div>
    )
}

export default CardClick;