import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Euclid, sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {},
  palette: {
    primary: {
      main: '#1A6BDE',
    },
    secondary: {
      main: '#262842',
    },
    error: {
      main: '#D6331F',
    },
    success: {
      main: '#2DB77B',
    },
    warning: {
      main: '#FFA530',
    },
  },
});

theme.components = {
  MuiButton: {
    styleOverrides: {
      root: {
        boxSizing: 'border-box',
        border: 'none',
        outline: 'none',
        textTransform: 'none',
        borderRadius: 12,
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: theme.typography.button.fontFamily,
        fontSize: theme.typography.button.fontSize,
        padding: '10px 16px',
      },
      outlined: {
        background: '#FFFFFF',
        color: 'black',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        boxShadow: 'none',
        '&:hover': {
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.12)',
        },
        '&:active': {
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.12)',
        },
        '&:disabled': {
          border: '1px solid rgba(0, 0, 0, 0.12)',
        },
        '&:focused': {
          background: '#FFFFFF',
          color: theme.palette.secondary.main,
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        '& fieldset': {
          borderColor: '1px solid rgba(38, 40, 66, 0.12)',
        },
      },
      notchedOutline: {
        '.Mui-focused &': {
          borderColor: '#497CF6 !important',
        },
      },
      input: {
        borderRadius: '12px',
        padding: '20px 12px',
        fontSize: '16px',
        '&::placeholder': {
          color: '#8B8C9E',
          opacity: 1,
        },
        '&.Mui-disabled': {
          background: '#F0F0F7',
        },
        '&.Mui-focused': {
          borderColor: '#497CF6',
        },
      },
      inputSizeSmall: {
        height: '32px',
        padding: '4px 12px',
        minHeight: 'unset',
      },
    },
  },
};

export default theme;
