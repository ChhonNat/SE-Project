import React from "react";
import Typography from '@mui/material/Typography';

const TitleComponent = (props) => {

    const { title, subTitle } = props;

    return (
        <>
            <Typography variant="h5" id="title" component="div"
                sx={{
                    fontWeight: 'bold',
                    width: 'max-content'
                }}
            >
                {title}
            </Typography>
            <Typography variant="body1" id="subTitle" component="div"
                sx={{
                    width: 'max-content'
                }}
            >
                {subTitle}
            </Typography>
        </>
    )
};

export default TitleComponent;