import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

const FooterComponent = (props) => {

    const { buttonActions } = props;

    return (
        <>
            <br></br>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                columnGap={2}
            >
                <Button className="btn-submit" variant="contained" type="submit">
                    <SaveIcon sx={{mr: 0.3}}/>
                    Save
                </Button>
                <Link to={buttonActions?.home}>
                    <Button className="btn-submit" variant="contained" color="error">
                        <DoDisturbIcon sx={{mr: 0.3}} />
                        Cancel
                    </Button>
                </Link>
            </Grid>
        </>

    )
};

export default FooterComponent;