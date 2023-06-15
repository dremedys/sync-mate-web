import { client } from '@/services/client';
import { PaginatedUniversityList } from '@/types/university';

export const getUniversities = () => {
  return client.get<PaginatedUniversityList>('/universities/', { params: { limit: 100 } });
};
