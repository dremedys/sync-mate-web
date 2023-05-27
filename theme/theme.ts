import { createTheme } from '@mui/material';
import * as React from 'react';

declare module '@mui/material/styles/createTypography' {
  interface FontStyle {
    fontWeightSemiBold: React.CSSProperties['fontWeight'];
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    displaySmall: React.CSSProperties;
    displayMedium: React.CSSProperties;
    displayLarge: React.CSSProperties;
    headlineLarge: React.CSSProperties;
    headlineMedium: React.CSSProperties;
    headlineSmall: React.CSSProperties;
    titleLarge: React.CSSProperties;
    titleMedium: React.CSSProperties;
    titleSmall: React.CSSProperties;
    bodyLarge: React.CSSProperties;
    bodyMedium: React.CSSProperties;
    bodySmall: React.CSSProperties;
    paragraphLarge: React.CSSProperties;
    paragraphMedium: React.CSSProperties;
    paragraphSmall: React.CSSProperties;
    button: React.CSSProperties;
    caption: React.CSSProperties;
    underline: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    displaySmall: React.CSSProperties;
    displayMedium: React.CSSProperties;
    displayLarge: React.CSSProperties;
    headlineLarge: React.CSSProperties;
    headlineMedium: React.CSSProperties;
    headlineSmall: React.CSSProperties;
    titleLarge: React.CSSProperties;
    titleMedium: React.CSSProperties;
    titleSmall: React.CSSProperties;
    bodyLarge: React.CSSProperties;
    bodyMedium: React.CSSProperties;
    bodySmall: React.CSSProperties;
    paragraphLarge: React.CSSProperties;
    paragraphMedium: React.CSSProperties;
    paragraphSmall: React.CSSProperties;
    button: React.CSSProperties;
    caption: React.CSSProperties;
    underline: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    displaySmall: true;
    displayMedium: true;
    displayLarge: true;
    headlineLarge: true;
    headlineMedium: true;
    headlineSmall: true;
    titleLarge: true;
    titleMedium: true;
    titleSmall: true;
    bodyLarge: true;
    bodyMedium: true;
    bodySmall: true;
    paragraphLarge: true;
    paragraphMedium: true;
    paragraphSmall: true;
    button: true;
    caption: true;
    underline: true;
  }
}

const theme = createTheme({
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

theme.typography = {
  ...theme.typography,
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  fontFamily: [
    'Euclid',
    'sans-serif',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
};

theme.typography = {
  ...theme.typography,
  headlineLarge: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '45px',
    lineHeight: '50px',
    display: 'block',
  },
  displayMedium: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '14px',
    lineHeight: '18px',
    display: 'block',
  },
  headlineMedium: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '14px',
    lineHeight: '18px',
    display: 'block',
  },
  displaySmall: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '12px',
    lineHeight: '16px',
    display: 'block',
  },
  headlineSmall: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '12px',
    lineHeight: '16px',
    display: 'block',
  },
  titleLarge: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '16px',
    lineHeight: '20px',
    display: 'block',
  },
  titleMedium: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '14px',
    lineHeight: '18px',
    display: 'block',
  },
  titleSmall: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '12px',
    lineHeight: '16px',
    display: 'block',
  },
  bodyLarge: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '16px',
    lineHeight: '24px',
    display: 'block',
  },
  bodyMedium: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '14px',
    lineHeight: '20px',
    display: 'block',
  },
  bodySmall: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '12px',
    lineHeight: '16px',
    display: 'block',
  },
  paragraphLarge: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '16px',
    lineHeight: '24px',
    display: 'block',
  },
  paragraphMedium: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '14px',
    lineHeight: '20px',
    display: 'block',
  },
  paragraphSmall: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '12px',
    lineHeight: '16px',
    display: 'block',
  },
  button: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '14px',
    lineHeight: '18px',
    display: 'inline-block',
  },
  caption: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '12px',
    lineHeight: '16px',
    display: 'block',
  },
  underline: {
    textDecoration: 'underline',
  },
};

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
    defaultProps: {
      placeholder: 'Start typing..',
    },
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
