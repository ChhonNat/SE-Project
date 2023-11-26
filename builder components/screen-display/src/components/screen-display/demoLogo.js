import { Box, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import abada_icon_1 from './../../assets/logo/Abadas_logo_verticle.png';


const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#fff',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    },
  },
});

const commonStyles = {
  // bgcolor: 'background.paper',
  // borderColor: 'text.primary',
  // m: 2,
  // border: 1,
  width: '8rem',
  height: '8rem',
};




const DemoLogo = () => {
  return (

    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={3} container justifyContent={"center"} alignItems='center'>

          {/* <RowCard /> */}
          <Box sx={{ ...commonStyles, borderRadius: '50%' }}>
            <img style={{ width: "180px" }} src={abada_icon_1} alt="" />
          </Box>
        </Grid>
        <Grid item xs={9} textAlign='start' container alignItems='center'>
          {/* <Typography variant="h4" color="black" >
            Abada's Queue System
          </Typography>
          <Typography variant="h5" color="black" >
            Abada's Digital Queue
          </Typography> */}
          <CardContent>
            <Typography  sx={{ textTransform: 'uppercase', m: 1 }} gutterBottom variant="h4" component="div">
              ABADAS's Digital Queue System
            </Typography>
            <Typography sx={{paddingLeft: '10px', textAlign: 'center'}} variant="body2" color="text.secondary">
              Experience the Difference: Efficient, Seamless, and Time-Saving
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default DemoLogo;