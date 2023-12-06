import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import flexStyle from '../../Style/Theme/ItemStyle/flexStyle';
import ActiveCounting from './activeCouting';
import DemoDate from './date';
import DemoLogo from './demoLogo';
import DemoVdo from './demoVdo';
import PreviewCounting from './previewedCounting';

// conten marguee
const productTitles = [
    'Elevate your style with our latest timepieces.',
    'Upgrade your everyday with our smartwatches and wearables.',
    'Discover the perfect match for your wrist.',
    'Timeless designs and cutting-edge technology come together.',
    'Express your individuality with our curated collection.',
    'More than just a watch, it\'s a statement.',
    'Elevate your everyday with our stylish and functional wearables.',
    'Stay connected and in control with our smartwatch technology.',
    'Find the perfect watch to complement your active lifestyle.',
    'Our watches are designed to stand the test of time.'
  ];

const ScreenDisplay = () => {
    return (
        <Box sx={{ width: '100%'}}>
            <Grid container spacing={2} p={0}>
                <Grid item xs={6}>
                    <Grid
                        xs={12}
                        p={2}
                        sx={{
                            ...flexStyle,
                            height: '20vh',
                        }}
                    >
                            <ActiveCounting />
                    </Grid>

                    <Grid
                        xs={12}
                        sx={{
                            ...flexStyle,
                            height: '70vh',
                        }}
                    >
                            <DemoVdo
                                url="https://youtu.be/Q4z5K-zKY8U?si=t9qrDwDMNjExi3YL"
                            />
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid
                        xs={12}
                        sx={{
                            ...flexStyle,
                            height: '20%',
                        }}
                    >
                            <DemoLogo />
                    </Grid>

                    <Grid
                        xs={12}
                        sx={{
                            ...flexStyle,
                            height: '80%',
                        }}
                        >
                            <PreviewCounting />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid
                        xs={12}
                        sx={{
                            ...flexStyle,
                            height: '10vh',
                        }}
                    >
                            <DemoDate
                                productTitles={productTitles}
                            />
                    </Grid>

                </Grid>
            </Grid>
        </Box>
    )
}

export default ScreenDisplay;