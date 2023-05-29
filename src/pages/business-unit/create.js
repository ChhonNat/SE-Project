import React from "react";
import Box from "@mui/material/Box";
import { TextField, Grid } from "@mui/material";
import FooterComponent from "../../components/page/footer";
import { SCREEN_URL } from "../../constants/screen_url";

const CreateNewBusiness = () => {
    return (
        <Box sx={{ width: '100%' }} component="form">

            {/* Input Fields */}
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        id="name"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        size="meduim"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        id="description"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        size="meduim"
                    />
                </Grid>
            </Grid>

            {/* Footer Page */}
            <FooterComponent buttonActions={SCREEN_URL.settings.business} />
        </Box>
    )
};

export default CreateNewBusiness;