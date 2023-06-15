import { client } from '@/services/client';
import { Params } from '@/types/common';
import { GetPeopleResponseDto } from '@/types/people';

export const getPeople = (params: Params & { team_id: number }) => {
  return client.get<GetPeopleResponseDto>('/people/', { params });
};

export const getPersonDetails = (id: number) => {
  return client.get<GetPeopleResponseDto>(`/people/${id}`);
};

export const likePerson = (id: number, team_id: number) => {
  return client.post(`/people/${id}/like/`, { team_id });
};

export const dislikePerson = (id: number, team_id: number) => {
  return client.post(`/people/${id}/dislike/`, { team_id });
};
