import React from "react";
import { Grid, Button } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const FooterComponent = (props) => {

    const {handleSave, handleCancel, saveButtunType } = props;

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

                <Button
                    variant="outlined"
                    // startIcon={<ClearOutlinedIcon />}
                    color="error"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>

                <Button
                    variant="outlined"
                    // endIcon={<SaveIcon />}
                    type={saveButtunType || 'button'}
                    onClick={handleSave}
                >
                    Save
                </Button>

            </Grid>
            <br></br>
        </>

    )
};

export default FooterComponent;