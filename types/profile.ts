import { University } from '@/types/university';

export enum StudentDegree {
  BACHELORS = 'BACHELORS',
  ASSOCIATE = 'ASSOCIATE',
  GRADUATE = 'GRADUATE',
  DOCTORATE = 'DOCTORATE',
  PROFESSIONAL = 'PROFESSIONAL',
  MASTERS = 'MASTERS',
}

export type GetEducationResponseDto = {
  id: number;
  school: University;
  degree: StudentDegree;
  gpa: number;
  start_date: string;
  end_date: string;
  field_of_study: string;
  activity: string;
};

export type CreateOrUpdateEducationResponseDto = {
  school_id: number;
  degree: StudentDegree;
  gpa: number;
  start_date: string;
  end_date: string;
  field_of_study: string;
  activity: string;
};

export type CreateCertificateDto = {
  file_name: string;
  organisation_name: string;
  credential_url: string;
};

export type GetCertificateDto = {
  file_name: string;
  organisation_name: string;
  credential_url: string;
  id: number;
};

export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
  FREELANCE = 'FREELANCE',
  CONTRACT = 'CONTRACT',
  INTERNSHIP = 'INTERNSHIP',
  APPRENTICESHIP = 'APPRENTICESHIP',
  SEASONAL = 'SEASONAL',
}

export type CreateOrUpdateWorkDto = {
  position: string;
  company_name: string;
  employment_type: EmploymentType;
  start_date: string;
  end_date: string;
  location: string;
  description: string;
};

export type GetWorkDto = {
  id: number;
  position: string;
  company_name: string;
  employment_type: EmploymentType;
  start_date: string;
  end_date: string;
  location: string;
  description: string;
};
