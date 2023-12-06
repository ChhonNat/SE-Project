import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React from 'react';
import ActiveCounting from './activeCouting';
import DemoVdo from './demoVdo';

const flexStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: '#d1c4e9',
}
const Item = styled(Paper)(({ theme }) => ({
    ...flexStyle,
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#673ab7',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '90%',
    width: '95%',
    borderRadius: '16px'
}));


const Layout = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container>
                <Grid item xs={12}>
                    <Grid
                        xs={6}
                        sx={{
                            ...flexStyle,
                            height: '30vh',
                        }}
                    >
                        <Item>
                            <ActiveCounting />
                        </Item>
                    </Grid>

                    <Grid
                        xs={6}
                        sx={{
                            ...flexStyle,
                            height: '70vh',
                        }}
                    >
                        <Item>
                            <DemoVdo />
                        </Item>
                    </Grid>
                </Grid>

            </Grid>
        </Box>
    )
}

export default Layout;