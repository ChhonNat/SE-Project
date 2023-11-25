import { Box, Grid } from '@mui/material';
import React from 'react';
import PreviewCounting from './previewedCounting';

const ScreenDisplay = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container sx={12}>
                <Grid item xs={6}>
                    <Grid item xs={12}>
                       <Box
                            sx={{bgcolor: ""}}
                       />
                    </Grid>

                    <Grid item xs={12}>
                        <PreviewCounting />
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ScreenDisplay;