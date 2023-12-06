import { Avatar, Chip, Container, Divider, Paper, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import logo from './../../assets/logo/Abadas_logo_verticle.png';
import profile from './../../assets/profiles/1.jpg';

export default function Counter() {
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
                            Sok Kimny
                        </Typography>
                    </Stack>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container
                sx={{
                    mt: 1
                }}
            >
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
                    <Chip color="primary" label="Counter 1" size='medium' avatar={<Avatar src={profile} />} />
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
                                    Current token : 1024
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
                                    Waiting number : 24
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
                    >
                        Next call
                    </Button>

                </Stack>
            </Container>
        </Box>
    );
}