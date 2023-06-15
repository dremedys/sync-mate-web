import { EventEmitter } from 'events';

import {
  AuthSubjectValue,
  AuthTokens,
  GetProfileResponseDto,
  SignInRequestDto,
  SignUpRequestDto,
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
    const expire_date = new Date('01-01-2100');
    if (tokens && expire_date && expire_date.getTime() - now.getTime() <= 0) {
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
    const idToken = this.getAccessToken();
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

  public getAccessToken = (): string | null => {
    let tokens: AuthTokens | null = null;
    try {
      tokens = JSON.parse(localStorage.getItem(TOKEN_STORAGE_KEY) || '');
    } catch (e) {
      console.error(e);
    }
    return tokens?.access ?? null;
  };

  public persistProfile = (profile: GetProfileResponseDto) => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  };

  public persistTokens = (tokens: AuthTokens) => {
    localStorage.setItem(
      TOKEN_STORAGE_KEY,
      JSON.stringify({
        ...tokens,
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
      const idToken = this.getAccessToken();
      if (idToken) {
        axiosError.config.headers = {
          ...axiosError?.config?.headers,
          Authorization: `Bearer ${idToken}`,
        };
      }
      return axios.request(axiosError?.config);
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
    return axios.post<AuthTokens>(`${this.config.apiRoot}/api/auth/sign-in/`, body).then(res => res.data);
  };

  public refreshToken = () => {
    return axios
      .post<AuthTokens>(`${this.config.apiRoot}/api/auth/token/refresh/`, { refresh: this.getTokens()?.refresh })
      .then(res => res.data);
  };

  public signUp = (body: SignUpRequestDto) => {
    return axios.post(`${this.config.apiRoot}/api/auth/sign-up/`, body).then(res => res.data);
  };

  public getProfile = () => {
    return this.httpClient
      .get<GetProfileResponseDto>(`${this.config.apiRoot}/api/profile/`, {
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`,
        },
      })
      .then(res => {
        this.persistProfile(res.data);
        return res?.data;
      });
  };

  public updateProfile = (data: UpdateProfileRequestDto) => {
    return axios
      .patch<GetProfileResponseDto>(`${this.config.apiRoot}/api/profile/`, data, {
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`,
        },
      })
      .then(res => {
        this.persistProfile(res.data);
        return res.data;
      });
  };

  public logout = () => {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  };
}
