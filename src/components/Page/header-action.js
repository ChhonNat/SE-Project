import React from "react";
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from "react-router-dom";

/**
 * Custom on search column
 */
const searchStyles = {
    paperSX: { p: '2px 4px', display: 'flex', alignItems: 'center' },
    inputBaseSX: { ml: 1, flex: 1 },
    inputBaseProps: { 'aria-label': 'search google maps' },
    dividerSX: { height: 28, m: 0.5 },
    iconButtonSX: { p: '10px' },
};

const HeaderActionComponent = (props) => {

    const { buttonActions, useActions } = props || {};

    return (
        <>
            <Box sx={{ flexGrow: 1, mb: 4, alignItems: 'end' }}>
                <Grid container spacing={2}>
                    {
                        Object.values(useActions).length ?
                            <>
                                <Grid xs={6} md={6}>
                                    {/* Search Column */}
                                    {
                                        useActions?.search &&
                                        <Paper
                                            component="form"
                                            sx={searchStyles.paperSX}
                                        >
                                            <InputBase
                                                sx={searchStyles.inputBaseSX}
                                                placeholder="Search Record"
                                                inputProps={searchStyles.inputBaseProps}
                                            />
                                            <Divider sx={searchStyles.dividerSX} orientation="vertical" />
                                            <IconButton type="button" sx={searchStyles.iconButtonSX} aria-label="search">
                                                <SearchIcon />
                                            </IconButton>
                                        </Paper>
                                    }
                                </Grid>
                                <Grid xs={6} md={6} sx={{ textAlign: 'right' }}>
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                        {/* Button Action Column */}
                                        {
                                            useActions?.create &&
                                            <Link to={buttonActions?.create}>
                                                <Button>
                                                    <AddCircleOutlineIcon sx={{ mr: 0.3 }} />
                                                    Add New
                                                </Button>
                                            </Link>
                                        }

                                    </ButtonGroup>
                                </Grid>
                            </>
                            :
                            <></>
                    }

                </Grid>
            </Box>
        </>

    )
};

export default HeaderActionComponent;