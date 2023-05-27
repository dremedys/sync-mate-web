import { GetTagResponseDto } from '@/types/tag';

export type GetTeamResponseDto = {
  id: number;
  name: string;
  max_members: number;
  description: string;
  avatar: string;
  tags: GetTagResponseDto[];
  country: string;
  city: string;
};

export type CreateTeamRequestDto = {
  name: string;
  max_members: number;
  description: string;
  avatar: string;
  tag_ids: number[];
  address: number;
  country: string;
  city: string;
};

export type GetTeamsResponseDto = {
  results: GetTeamResponseDto[];
};
