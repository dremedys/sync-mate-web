import { GetTagResponseDto, PaginatedResponseDto } from '@/types/tag';

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
export enum InteractionEnum {
  ADMIN_LIKED = 'ADMIN_LIKED',
  ADMIN_DISLIKED = 'ADMIN_DISLIKED',
  ADMIN_REPORTED = 'ADMIN_REPORTED',
  REMOVED = 'REMOVED',
  LEFT = 'LEFT',
  USER_LIKED = 'USER_LIKED',
  USER_DISLIKED = 'USER_DISLIKED',
  REPORTED = 'REPORTED',
  MODERATOR = 'MODERATOR',
  MEMBER = 'MEMBER',
}

export type GetMyTeamResponseDto = GetTeamResponseDto & {
  max_members: number;
  members: {
    id: number;
    username: string;
    full_name: string;
    interaction: InteractionEnum;
    avatar: string;
  }[];
};

export type GetTeamsResponseDto = PaginatedResponseDto<GetTeamResponseDto>;

export type GetMyTeamsResponseDto = PaginatedResponseDto<GetMyTeamResponseDto>;

export type GetChatTeamResponseDto = GetTeamResponseDto & {
  members: {
    id: string;
    full_name: string;
    avatar: string;
    interaction: InteractionEnum;
  }[];
};
