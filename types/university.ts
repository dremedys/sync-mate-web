import { PaginatedResponseDto } from '@/types/tag';

export type University = {
  id: number;
  name: string;
};

export type PaginatedUniversityList = PaginatedResponseDto<University>;
