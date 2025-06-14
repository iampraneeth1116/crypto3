import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3a80e9',
    },
    background: {
      default: '#242424',
      paper: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: '"Inter", "system-ui", "Avenir", "Helvetica", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
        },
      },
    },
  },
});

export default theme;