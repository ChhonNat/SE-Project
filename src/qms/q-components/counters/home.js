import { Avatar, Chip, Container, Divider, Paper, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLogout } from '../../../store/authentication/authenticationService';
import logo from './../../assets/logo/Abadas_logo_verticle.png';
import profile from './../../assets/profiles/1.jpg';
import CounterUnactive from './counterUnActive';

export default function Counter() {

    const dataUser = useSelector(state => state?.userAuthendicated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(isLogout());
        navigate("/login");
    };

    // action calling
    const handleNextCall = () => {

    }
    const handleRecall = () => {
        console.log("Recall...");
    }


    const [dataCounter, setDataCounter] = useState({});
    useEffect(() => {
        if (dataUser?.isAuthenticated) {
            setDataCounter({
                ...dataCounter,
                userName: dataUser?.username,
                counterNum: dataUser?.staffId,
                currentTicket: "22",
                waitNumber: "8"
            })
        }
    }, [dataUser]);

    const {
        userName,
        counterNum,
        currentTicket,
        waitNumber
    } = dataCounter;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Stack direction="row" alignItems={'center'} spacing={2}>
                        <Avatar alt="Cindy Baker" src={profile} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {userName ?? ""}
                        </Typography>
                    </Stack>
                    <Button
                        color="inherit"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Container
                sx={{
                    mt: 1
                }}
            >
                {dataUser?.active
                    ?
                    <>
                        <Stack
                            direction={'column'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            mb={2}
                        >
                            <img width={'230px'} src={logo} alt="log" />
                            <Typography variant='h4' >
                                ABADAS'S DIGITAL QUEUE SYSTEM
                            </Typography>
                            <Typography variant='subtitle2' gutterBottom>
                                Experience the Difference: Efficient, Seamless, and Time-Saving
                            </Typography>
                        </Stack>
                        <Divider>
                            <Chip color="primary" label={`Counter ${counterNum}`} size='medium' avatar={<Avatar src={profile} />} />
                        </Divider>

                        <Container>
                            <Stack>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'start',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            padding: '10px',
                                            margin: '5px'
                                        }}
                                    >
                                        <Typography variant='h6'>
                                            Current ticket : {currentTicket ?? ""}
                                        </Typography>
                                    </Paper>
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            padding: '10px',
                                            margin: '5px'
                                        }}
                                    >
                                        <Typography variant='h6'>
                                            Waitting number : {waitNumber ?? ""}
                                        </Typography>
                                    </Paper>
                                </Box>
                            </Stack>
                        </Container>

                        <Stack
                            direction={'row'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            mt={12}
                            spacing={6}
                        >

                            <Button
                                variant="contained"
                                sx={{
                                    fontSize: '1.3rem',
                                    height: '10vh',
                                    width: '160px'
                                }}
                                onClick={handleRecall}
                            >
                                recall
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    fontSize: '1.3rem',
                                    height: '10vh',
                                    width: '160px'
                                }}
                                onClick={handleNextCall}

                            >
                                Next call
                            </Button>

                        </Stack>
                    </>
                    : <CounterUnactive />
                }
            </Container>
        </Box>
    );
}