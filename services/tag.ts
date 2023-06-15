import { client } from '@/services/client';
import { Params } from '@/types/common';
import { GetTagResponseDto, GetTagsPaginatedResponseDto } from '@/types/tag';

export const getTags = () => {
  return client.get<GetTagResponseDto[]>(`/tags/`);
};

export const getTopTags = (params: Params) => {
  return client.get<GetTagsPaginatedResponseDto>(`/tags/top/`, { params });
};
