import { client } from '@/services/client';
import { Params } from '@/types/common';
import { CreateTeamRequestDto, GetMyTeamResponseDto, GetTeamsResponseDto, InteractionEnum } from '@/types/team';

export const createTeam = (body: CreateTeamRequestDto) => {
  return client.post(`/teams/`, body);
};

export const getTeams = (params: Params) => {
  return client.get<GetTeamsResponseDto>('/teams/', { params });
};

export const getMyTeams = (params: Params & { is_admin?: boolean }) => {
  return client.get<GetMyTeamResponseDto[]>('/teams/my/', { params });
};

export const getMyTeam = (id: number) => {
  return client.get<GetMyTeamResponseDto>(`/teams/my/${id}`);
};

export type LikeTeamResponse = {
  interaction: InteractionEnum;
};

export const likeTeam = (id: number) => {
  return client.post<LikeTeamResponse>(`/teams/${id}/like/`);
};

export const dislikeTeam = (id: number) => {
  return client.post<GetTeamsResponseDto>(`/teams/${id}/dislike/`);
};
