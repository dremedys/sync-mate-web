import { EventEmitter } from 'events';

import {
  AuthSubjectValue,
  AuthTokens,
  GetProfileResponseDto,
  SignInRequestDto,
  SignUpRequestDto,
  SignUpResponseDto,
  UpdateProfileRequestDto,
} from '@/types/auth';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BehaviorSubject } from 'rxjs';

export enum AuthStatus {
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export interface AuthConfig {
  apiRoot: string;
}

export const TOKEN_STORAGE_KEY = 'sync-mate-web-auth';
export const PROFILE_STORAGE_KEY = 'sync-mate-web-profile';

const getAuthSubjectValueFromStorage = (): AuthSubjectValue | null => {
  if (typeof window === 'undefined') return null;

  const _profile = localStorage.getItem(PROFILE_STORAGE_KEY);
  const _tokens = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (!_tokens || !_profile) {
    return null;
  }

  try {
    const profile = JSON.parse(_profile);
    const tokens = JSON.parse(_tokens);
    return {
      profile,
      tokens,
    };
  } catch (e) {
    return null;
  }
};

export class AuthService {
  httpClient: AxiosInstance;

  private tokenRefreshing: Promise<void> | null = null;

  public loginStatus = new EventEmitter();

  private loggedIn = new BehaviorSubject<AuthSubjectValue | null>(getAuthSubjectValueFromStorage());
  public loggedIn$ = this.loggedIn.asObservable();

  constructor(private config: AuthConfig) {
    this.httpClient = axios.create();

    this.httpClient.interceptors.response.use((response: AxiosResponse) => response, this.refreshTokenErrorInterceptor);
  }

  static createInstance(config: AuthConfig) {
    return new AuthService(config);
  }

  public setLoggedInValue = (v: AuthSubjectValue | null) => {
    this.loggedIn.next(v);
  };

  public createHttpClient(axiosConfig?: AxiosRequestConfig): AxiosInstance {
    const httpClient = axios.create(axiosConfig);
    httpClient.interceptors.request.use(this.authTokenRequestInterceptor);
    httpClient.interceptors.response.use((response: AxiosResponse) => response, this.refreshTokenErrorInterceptor);
    return httpClient;
  }

  private authTokenRequestInterceptor = async (config: AxiosRequestConfig) => {
    // Don't override defined header
    if (config.headers?.['Authorization']) {
      return config;
    }
    if (this.tokenRefreshing) {
      await this.tokenRefreshing;
    }
    const tokens = this.getTokens();
    const now = new Date();
    // Token is expired
    if (tokens && tokens.expire_date && tokens.expire_date - now.getTime() <= 0) {
      this.tokenRefreshing = new Promise(resolve => {
        this.refreshTokenAndProfile()
          .catch(() => {
            this.loginStatus.emit(AuthStatus.UNAUTHORIZED, true);
            this.logout();
          })
          .finally(() => {
            resolve();
            this.tokenRefreshing = null;
          });
      });
      await this.tokenRefreshing;
    }
    // Add token to headers
    const idToken = this.getIdToken();
    if (idToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${idToken}`,
      };
    } else {
      delete config.headers?.['Authorization'];
    }
    return config;
  };

  public getIdToken = (): string | null => {
    let tokens: AuthTokens | null = null;
    const storedTokens = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!storedTokens) {
      return null;
    }
    try {
      tokens = JSON.parse(storedTokens);
    } catch (e) {
      console.error(e);
    }
    return tokens?.id_token ?? null;
  };

  public getAccessToken = (): string | null => {
    let tokens: AuthTokens | null = null;
    try {
      tokens = JSON.parse(localStorage.getItem(TOKEN_STORAGE_KEY) || '');
    } catch (e) {
      console.error(e);
    }
    return tokens?.access_token ?? null;
  };

  public persistProfile = (profile: GetProfileResponseDto) => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  };

  public persistTokens = (tokens: AuthTokens) => {
    const expire_date = new Date().getTime() + tokens.expires_in * 1000;
    localStorage.setItem(
      TOKEN_STORAGE_KEY,
      JSON.stringify({
        ...tokens,
        expire_date,
      }),
    );
  };

  public getTokens = (): AuthTokens | null => {
    let tokens: AuthTokens | null = null;

    if (typeof window === 'undefined') {
      return null;
    }
    const storedTokens = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!storedTokens) {
      return null;
    }
    try {
      tokens = JSON.parse(storedTokens);
    } catch (e) {
      console.error(e);
    }
    return tokens;
  };

  private refreshTokenErrorInterceptor = async (axiosError: AxiosError) => {
    if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
      if (!this.tokenRefreshing) {
        this.tokenRefreshing = new Promise(resolve => {
          this.refreshTokenAndProfile()
            .then(authInfo => {
              return authInfo;
            })
            .catch(() => {
              this.loginStatus.emit(AuthStatus.UNAUTHORIZED, true);
              this.logout();
            })
            .finally(() => {
              resolve();
              this.tokenRefreshing = null;
            });
        });
      }
      await this.tokenRefreshing;
      const idToken = this.getIdToken();
      if (idToken) {
        axiosError.config.headers = {
          ...axiosError.config.headers,
          Authorization: `Bearer ${idToken}`,
        };
      }
      return axios.request(axiosError.config);
    }
    throw axiosError;
  };

  public refreshTokenAndProfile = () => {
    return this.refreshToken().then(async authInfo => {
      this.persistTokens(authInfo);
      const profile = await this.getProfile();
      this.persistProfile(profile);
      this.setLoggedInValue({ profile, tokens: authInfo });
      return authInfo;
    });
  };

  public login = (body: SignInRequestDto) => {
    return axios.post<AuthTokens>(`/api/login`, body).then(res => res.data);
  };

  public refreshToken = () => {
    const params = new URLSearchParams();
    params.append('refresh_token', this.getTokens()?.refresh_token || '');

    return axios.post<AuthTokens>(`/api/token`, params).then(res => res.data);
  };

  public checkIfUserExists = (username: string) => {
    return axios.post<any>(`${this.config.apiRoot}/username/check`, {
      username,
    });
  };

  public signUp = (body: SignUpRequestDto) => {
    return axios.post<SignUpResponseDto>(`/api/oauth/signup`, body).then(res => res.data);
  };

  public getProfile = () => {
    return this.httpClient
      .get<GetProfileResponseDto>(`${this.config.apiRoot}/profile`, {
        headers: {
          Authorization: `Bearer ${this.getIdToken()}`,
        },
      })
      .then(res => res?.data);
  };

  public updateProfile = (data: UpdateProfileRequestDto) => {
    return axios
      .patch<GetProfileResponseDto>(`${this.config.apiRoot}/profile`, data, {
        headers: {
          Authorization: `Bearer ${this.getIdToken()}`,
        },
      })
      .then(res => res.data);
  };

  public logout = () => {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  };
}
