import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'dark', // or 'light' based on your preference
    primary: {
      light: '#757ce8',
      main: '#000',
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

export default theme;
