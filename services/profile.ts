import { client } from '@/services/client';
import { CreateCertificateDto, CreateOrUpdateEducationResponseDto, CreateOrUpdateWorkDto } from '@/types/profile';

export const addEducation = (body: CreateOrUpdateEducationResponseDto) => {
  return client.post('/profile/educations/', body);
};

export const deleteEducation = (id: number) => {
  return client.delete(`/profile/educations/${id}/`);
};

export const createCerficate = (body: CreateCertificateDto) => {
  return client.post('/profile/licences/', body);
};

export const deleteCertificate = (id: number) => {
  return client.delete(`/profile/licences/${id}/`);
};

export const addWorkExperience = (body: CreateOrUpdateWorkDto) => {
  return client.post('/profile/work_experience/', body);
};

export const deleteWorkExperience = (id: number) => {
  return client.delete(`profile/work_experience/${id}/`);
};
