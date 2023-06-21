import React from "react";
import Typography from '@mui/material/Typography';

const TitleComponent = (props) => {

    const { title } = props;

    return (
        <Typography variant="h6" id="tableTitle" component="div"
            sx={{
                // background: '#f2eeee',
                // paddingLeft: 2,
                // paddingRight: 2,
                // borderRadius: 2,
                color: '#1976d2',
                fontWeight: 'bold',
                width: 'max-content'
            }}
        >
            {title}
        </Typography>
    )
};

export default TitleComponent;