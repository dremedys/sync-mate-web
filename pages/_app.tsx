import '../styles/app.scss';
import '../styles/reset.scss';

import Toaster from '@/components/toaster/toaster.component';
import { AuthProvider } from '@/providers/auth.provider';
import { theme } from '@/theme';
import { ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { NextRouter, useRouter } from 'next/router';
import { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const Noop: React.FC<PropsWithChildren<unknown>> = ({ children }) => <>{children}</>;

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  provider?: React.FC<PropsWithChildren<unknown>>;
  getLayout?: (page: ReactElement, router: NextRouter) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  const ContextProvider = Component.provider || Noop;

  return (
    <QueryClientProvider client={qc}>
      <Toaster />
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthProvider>
            <ContextProvider>{getLayout(<Component {...pageProps} />, router)}</ContextProvider>
          </AuthProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
