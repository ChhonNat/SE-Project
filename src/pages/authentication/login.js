import React from 'react';
import '../../App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { isLogin, userAuthentication } from '../../store/authentication/authenticationService';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../logo/login.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {

  const dispatch = useDispatch();

  const [showPwd, setShowPwd] = useState(false);

  /**
   * username: developer
   * pwd: dev123
   */

  const [username, setUserName] = useState('developer');
  const [password, setPassword] = useState('');

  const login = async (event) => {

    event.preventDefault();
    dispatch(userAuthentication({ username, password }));
  };

  return (

    <Grid container spacing={2}>

      <Grid item xs={8} sx={{ height: '100vh', backgroundColor: '#283C55', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logo} width={400} height={120} />
      </Grid>

      <Grid item xs={4} padding={10}>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>Recruitment Management System</h1>
        </div>

        <br></br>
        <br></br>

        <Box
          style={{ border: '1px solid #9a9a9a', padding: '20px', borderRadius: '20px 0 20px 0' }}
          component="form"
          // sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
          noValidate
          autoComplete="off"
        >
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

            <Grid item xs={12}>
              <h3>Login</h3>
            </Grid>

            <Grid item xs={12}>
              <TextField
                sx={{ width: '100%', paddingBottom: 3 }}
                onChange={(event) => setUserName(event.target.value)}
                value={username}
                label="Username"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl
                sx={{ width: '100%', paddingBottom: 3 }}
              >
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
              color="info"
              onClick={login}
              disabled={!username || !password}
            >
              login
            </Button>
          </Grid>
        </Box>
      </Grid>

    </Grid >

  );
}
