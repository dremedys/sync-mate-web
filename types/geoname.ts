export type GetCountryResponseDto = {
  countryName: string;
  countryCode: string;
};

export type GetCityResponseDto = {
  name: string;
};

export type GetCitiesResponseDto = {
  totalResultsCount: number;
  geonames: GetCityResponseDto[];
};

export type GetCountriesResponseDtp = {
  geonames: GetCountryResponseDto[];
};

export type GetCityParams = {
  country: string;
};
