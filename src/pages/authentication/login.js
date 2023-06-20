import React from 'react';
import '../../App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { isLogin, userAuthentication } from '../../store/authentication/authenticationService';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {

  const dispatch = useDispatch();

  const [username, setUserName] = useState('developer');
  const [password, setPassword] = useState('dev123');

  const login = async (event) => {

    event.preventDefault();
    dispatch(userAuthentication({ username, password }));
  };

  return (
    <Box
      style={{
        marginTop: '6%',
        marginLeft: '40%',
        marginRight: '20%',
        width: '18%',
        border: '1px solid #9a9a9a',
        padding: '20px',
        borderRadius: '20px 0 20px 0',
      }}
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid style={{ border: 'none', justityContent: 'center' }}>Log In</Grid>
      <TextField
        onChange={(event) => setUserName(event.target.value)}
        value={username}
        label="User Name"
        variant="outlined"
      />
      <br></br>
      <TextField
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        label="Password"
        variant="outlined"
      />
      <br></br>
      <hr />
      <br></br>
      <Button
        className="btn-submit"
        variant="outlined"
        color="success"
        onClick={login}
      >
        login
      </Button>
      <Button className="btn-submit" variant="outlined" color="error">
        Cancel
      </Button>
    </Box>
  );
}
