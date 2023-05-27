import { GetCitiesResponseDto, GetCityParams, GetCountriesResponseDtp } from '@/types/geoname';
import axios from 'axios';

const { NEXT_PUBLIC_DOMAIN } = process.env;

export const getCountries = () => {
  return axios.get<GetCountriesResponseDtp>(`${NEXT_PUBLIC_DOMAIN}/api/countries`, {});
};

export const getCities = (params: GetCityParams) => {
  return axios.get<GetCitiesResponseDto>(`${NEXT_PUBLIC_DOMAIN}/api/cities`, {
    params,
  });
};
