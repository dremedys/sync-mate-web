import { GetCertificateDto, GetEducationResponseDto, GetWorkDto } from '@/types/profile';
import { GetTagResponseDto, PaginatedResponseDto } from '@/types/tag';

export type GetPersonFromListDto = {
  id: number;
  full_name: string;
  bio: string;
  avatar: string;
  tags: GetTagResponseDto[];
};

export type GetDetailedPersonDto = GetPersonFromListDto & {
  education_history: GetEducationResponseDto[];
  licences: GetCertificateDto[];
  work_experience_history: GetWorkDto[];
  full_name: string;
};

export type GetPeopleResponseDto = PaginatedResponseDto<GetPersonFromListDto>;
