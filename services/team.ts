import { client } from '@/services/client';
import { Params } from '@/types/common';
import { CreateTeamRequestDto, GetTeamsResponseDto } from '@/types/team';

export const createTeam = (body: CreateTeamRequestDto) => {
  return client.post(`/teams/`, body);
};

export const getTeams = (params: Params) => {
  return client.get<GetTeamsResponseDto>('/teams/', { params });
};
