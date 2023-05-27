import { GetTagResponseDto } from '@/types/tag';

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

export interface GetProfileResponseDto {
  full_name: string;
  tags: GetTagResponseDto[];
  username: string;
  date_of_birth: string;
  country_name: string;
  city_name: string;
  bio: string;
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
  city_name?: string;
  country_name?: string;
  date_of_birth?: string;
  tag_ids?: Array<number>;
  image_urls?: string[];
  avatar?: string;
  bio?: string;
  username?: string;
}
