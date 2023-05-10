export interface AuthTokens {
  access: string;
  refresh: string;
  expire_at?: string;
}

export type AuthSubjectValue = {
  profile: GetProfileResponseDto;
  tokens: AuthTokens;
};

export interface SignInRequestDto {
  username: string;
  password: string;
}

export interface GetTagResponseDto {
  id: string;
  name: string;
}

export interface GetProfileResponseDto {
  full_name: string;
}

export interface SignUpRequestDto {
  username: string;
  email: string;
  password: string;
  full_name: string;
  is_signed: boolean;
}

export interface SignUpResponseDto {
  access: string;
  refresh: string;
}

export interface Address {
  city_id: number;
  country_name: string;
}

export interface UpdateProfileRequestDto {
  address?: Address;
  date_of_birth?: string;
  user_tag_ids?: Array<number>;
  image_urls?: string[];
  avatar?: string;
  bio?: string;
}
