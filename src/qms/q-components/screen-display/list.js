import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './../../Style/Theme/theme';

const ListWrapper = (props) => {
    const {bgList, bdrList, lHeight, numberTicked, numCounter, fontList} = props;
    return (
        <ThemeProvider theme={theme}>
            <Box  sx={{ flexGrow: 1, }} bgcolor={bgList} borderRadius={bdrList}>
                <Grid container height={lHeight}>
                    <Grid item xs={6} container justifyContent={'center'} alignItems={'center'}>
                        <Typography variant={fontList} style={{ color: theme.palette.primary.contrastText }}>
                            {numberTicked ?? 'NUMBER'}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} container justifyContent={'start'} alignItems={'center'}>
                        <Typography variant={fontList} style={{ color: theme.palette.primary.contrastText }}>
                            {numCounter ?? 'COUNTER'}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    )
}

export default ListWrapper;