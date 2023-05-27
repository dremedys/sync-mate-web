export interface GetTagResponseDto {
  id: number;
  name_ru: string;
  name_en: string;
}

export interface PaginatedResponseDto<T> {
  results: T[];
}

export type GetTagsPaginatedResponseDto = PaginatedResponseDto<GetTagResponseDto>;
