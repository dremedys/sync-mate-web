export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  expire_date?: number;
}

export type AuthSubjectValue = {
  profile: GetProfileResponseDto;
  tokens: AuthTokens;
};

export interface SignInRequestDto {
  username: string;
  password: string;
}

export interface SignInResponseDto {
  access_token: string;
  refresh_token: string;
}

export interface GetTagResponseDto {
  id: string;
  name: string;
}

export interface GetProfileResponseDto {
  firstName: string;
  lastName: string;
  tags: GetTagResponseDto[];
}

export interface SignUpRequestDto {
  username: string;
  password: string;
  name: string;
}

export interface SignUpResponseDto {
  access_token: string;
  refresh_token: string;
}

export interface UpdateProfileRequestDto {
  cityId?: string;
  countryId?: string;
  birthDate?: string;
  tagIds?: Array<number>;
  description?: string;
}
