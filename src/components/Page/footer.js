import React from "react";
import { Grid, Button } from "@mui/material";

import { styled } from '@mui/material/styles';
import { purple, blue, red, orange } from "@mui/material/colors";

const DangerButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    border: 0,
    backgroundColor: red[400],
    '&:hover': {
        backgroundColor: red[700],
        border: 0,
    },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    border: 0,
    backgroundColor: blue[400],
    '&:hover': {
        backgroundColor: blue[700],
        border: 0,
    },
}));

const WarningButton = styled(Button)(({theme}) => ({
    color: 'white',
    border: 0,
    backgroundColor: orange[400],
    '&:hover': {
        backgroundColor: orange[700],
        border: 0,
    }
}))

const FooterComponent = (props) => {

    const { 
            handleSave, 
            handleReject,
            handleCancel, 
            saveButtunType, 
            saveButtonLabel,
            rejectButtonLabel, 
            actions 
    } = props;

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="end"
                alignItems="center"
                columnGap={2}
                paddingX={2}
            >
                {
                    actions?.cancel &&
                    <DangerButton
                        variant="outlined"
                        color="error"
                        onClick={handleCancel}
                    >
                        Cancel
                    </DangerButton>
                }

                {
                    actions?.reject &&
                    <WarningButton
                        variant="outlined"
                        type={saveButtunType || 'button'}
                        onClick={handleReject}
                    >
                        {rejectButtonLabel ? rejectButtonLabel : 'Reject'}
                    </WarningButton>
                }

                {
                    actions?.submit &&
                    <PrimaryButton
                        variant="outlined"
                        type={saveButtunType || 'button'}
                        onClick={handleSave}
                    >
                        {saveButtonLabel ? saveButtonLabel : 'Save'}
                    </PrimaryButton>
                }

            </Grid>
            <br></br>
        </>

    )
};

export default FooterComponent;