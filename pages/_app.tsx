import '../styles/app.scss';
import '../styles/reset.scss';

import { AuthProvider } from '@/providers/auth.provider';
import { theme } from '@/theme';
import { ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
