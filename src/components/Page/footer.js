import { Button, Grid } from "@mui/material";
import React from "react";

import { blue, orange, red } from "@mui/material/colors";
import { styled } from '@mui/material/styles';

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

const WarningButton = styled(Button)(({ theme }) => ({
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
        handleSaveNew,
        handleReject,
        handleCancel,
        saveButtonType,
        saveNewButtonType,
        saveButtonLabel,
        saveNewButtonLabel,
        cancelButtonLabel,
        rejectButtonLabel,
        actions,
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
                        {cancelButtonLabel ? cancelButtonLabel : 'Cancel'}
                    </DangerButton>
                }

                {
                    actions?.reject &&
                    <WarningButton
                        variant="outlined"
                        type={saveButtonType || 'button'}
                        onClick={handleReject}
                    >
                        {rejectButtonLabel ? rejectButtonLabel : 'Reject'}
                    </WarningButton>
                }

                {
                    actions?.submit &&
                    <PrimaryButton
                        variant="outlined"
                        type={saveButtonType || 'button'}
                        onClick={handleSave}
                    >
                        {saveButtonLabel ? saveButtonLabel : 'Save'}
                    </PrimaryButton>
                }

                {
                    actions?.submitNew &&
                    <PrimaryButton
                        variant="outlined"
                        type={saveNewButtonType || 'button'}
                        onClick={handleSaveNew}
                    >
                        {saveNewButtonLabel ? saveNewButtonLabel : 'Save & New'}
                    </PrimaryButton>
                }

            </Grid>
            <br></br>
        </>

    )
};

export default FooterComponent;