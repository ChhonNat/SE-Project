import React from "react";
import { Grid, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { purple, blue, red } from "@mui/material/colors";


const DangerButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[400],
    '&:hover': {
        backgroundColor: red[700],
    },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[400],
    '&:hover': {
        backgroundColor: blue[700],
    },
}));

const FooterComponent = (props) => {

    const { handleSave, handleCancel, saveButtunType, saveButtonLabel } = props;

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
                <DangerButton 
                    variant="contained"
                    onClick={handleCancel}
                >
                    Cancel
                </DangerButton>

                <PrimaryButton 
                    variant="contained"
                    type={saveButtunType || 'button'}
                    onClick={handleSave}
                >
                    {saveButtonLabel ? saveButtonLabel : 'Save'}
                </PrimaryButton>

            </Grid>
            <br></br>
        </>

    )
};

export default FooterComponent;