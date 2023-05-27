import { client } from '@/services/client';
import { Params } from '@/types/common';
import { GetTagsPaginatedResponseDto } from '@/types/tag';

export const getTags = (params: Params) => {
  return client.get<GetTagsPaginatedResponseDto>(`/tags/`, { params });
};

export const getTopTags = (params: Params) => {
  return client.get<GetTagsPaginatedResponseDto>(`/tags/top/`, { params });
};
