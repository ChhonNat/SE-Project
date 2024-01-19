import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { PUSH_NOTIFICATION } from '../../../constants/pusher';
import echo from '../../../services/pusher.service';
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

    //   get data from pusher
    const [eventData, setEventData] = useState('0');

    useEffect(() => {
        // Subscribe to the channel and listen to the event
        echo.channel(PUSH_NOTIFICATION.PUSHER_CHANNEL.CHANNEL).listen(PUSH_NOTIFICATION.PUSHER_EVENT.EVENT, (data) => {
            setEventData(data);
        });

        // Clean up subscription when the component unmounts
        return () => {
            echo.leaveChannel(PUSH_NOTIFICATION.PUSHER_CHANNEL.CHANNEL);
        };
    }, []);

    console.log("get data from pusher: ", eventData);
    return (
        <Box sx={{ width: '100%' }}>
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
                        <ActiveCounting
                            bgList='#3f50b5'
                            bdrList='16px'
                            lHeight='120px'
                            numberTicked={eventData?.message ?? "1000"}
                            numCounter='COUNTER 1'
                            fontList='h2'
                        />
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