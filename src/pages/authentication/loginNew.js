import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import imagelogin from "../../assents/images/login2.jpg";
import { appConfig } from "../../constants/app_cont";
import { userAuthentication } from "../../store/authentication/authenticationService";


const LoginNew = () => {
    const dispatch = useDispatch();
    // const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);

    const login = async (event) => {
        event.preventDefault();
        // dispatch(userAuthentication({ username, password }));
        dispatch(userAuthentication({ email, password }));
    };
    return (
        <Grid container-fluid style={{
            background: `center / cover no-repeat url(${imagelogin})`,
            height: "98vh",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

        }}>
            <Box
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
            >
                <Grid
                    item
                    xs={4}
                    padding={10}
                    style={{
                        padding: "20px",
                        borderRadius: "10px",
                        background: "rgba(43,92,255,0.4)",
                        WebkitBackdropFilter: 'blur(10px)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "center", color: "aliceblue" }}>
                        <h1>{appConfig.appName}</h1>
                    </div>

                    <br></br>
                    <br></br>

                    <Box
                        component="form"
                        // sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
                        noValidate
                        autoComplete="off"
                    >
                        <Grid
                            container
                            rowSpacing={2}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                            <Grid item xs={12}>
                                <TextField
                                    type="email"
                                    color="primary"
                                    sx={{ width: "100%", paddingBottom: 3 }}
                                    // onChange={(event) => setUserName(event.target.value)}
                                    onChange={(event) => setEmail(event.target.value)}
                                    // value={username}
                                    value={email}
                                    label="Email"
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl sx={{ width: "100%", paddingBottom: 3 }}>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        label="password"
                                        type={showPwd ? "text" : "password"}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle pwd visibility"
                                                    onClick={() => setShowPwd(!showPwd)}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    edge="end"
                                                    disabled={!password}
                                                >
                                                    {showPwd ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        onChange={(event) => setPassword(event.target.value)}
                                        value={password}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <hr />
                        <Grid xs={12}>
                            <Button
                                type="submit"
                                className="btn-submit"
                                variant="contained"
                                color="primary"
                                onClick={login}
                                // disabled={!username || !password}
                                disabled={!email || !password}
                            >
                                login
                            </Button>
                        </Grid>
                    </Box>
                </Grid>
            </Box>
        </Grid>
    );
}

export default LoginNew;
