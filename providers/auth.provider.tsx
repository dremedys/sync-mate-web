import { AuthService, AuthStatus } from '@/services/auth';
import { AuthTokens, GetProfileResponseDto } from '@/types/auth';
import { useRouter } from 'next/router';
import { FC, createContext, useContext, useEffect, useState } from 'react';

export const authService = AuthService.createInstance({
  apiRoot: process.env.NEXT_PUBLIC_API_URL as string,
});

export type AuthState = {
  authenticated: boolean;
  isLoading: boolean;
  profile: GetProfileResponseDto | null;
  setProfile: (profile: GetProfileResponseDto | null) => void;
  login: (token: AuthTokens | null, redirectUrl?: string | null, disableRedirect?: boolean) => void;
  logout: () => void;
};

const setProfile = (profile: GetProfileResponseDto | null) => profile;

const login = (token: AuthTokens | null, redirectUrl?: string | null, disableRedirect?: boolean) => token;

const logout = () => '';

const AuthContext = createContext<AuthState>({
  authenticated: !!authService.getTokens(),
  profile: null,
  setProfile,
  login,
  logout,
  isLoading: true,
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [profile, setProfile] = useState<GetProfileResponseDto | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const sub = authService.loggedIn$.subscribe(v => {
      setProfile(v ? v.profile : null);
      setAuthenticated(Boolean(v?.tokens));
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handler = () => {
      authService.setLoggedInValue(null);
      router.push('/');
    };
    authService.loginStatus.on(AuthStatus.UNAUTHORIZED, handler);
    // return () => {
    //   authService?.loginStatus?.off(AuthStatus.UNAUTHORIZED, handler);
    // };
  }, [router]);

  useEffect(() => {
    if (authenticated) {
      setLoading(true);
      authService
        .getProfile()
        .then(p => {
          authService.persistProfile(p);
          setProfile(p);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [authenticated]);

  const login = async (tokens: AuthTokens | null, redirectUrl?: string | null, disableRedirect?: boolean) => {
    if (tokens) {
      authService.persistTokens(tokens);
      const profile = await authService.getProfile();
      authService.persistProfile(profile);
      authService.setLoggedInValue({ profile, tokens });
      if (!disableRedirect && redirectUrl !== undefined && redirectUrl !== null) {
        router.push(redirectUrl ?? '/');
      }
    }
  };

  const logout = () => {
    authService.logout();
    authService.setLoggedInValue(null);
    router.push('/auth/sign-in');
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: authenticated,
        profile,
        setProfile,
        logout,
        login,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
