import { EducationHistory } from '@/components/profile/additional-information/education-history/education-history';
import { WorkExperience } from '@/components/profile/additional-information/work-experience/work-experience';
import { CardItem } from '@/ui/card-item/card-item';
import { Typography, styled } from '@mui/material';

export const AdditionalInformation = () => {
  return (
    <CardItem>
      <Title>Additional information</Title>
      <EducationHistory />
      <WorkExperience />
    </CardItem>
  );
};

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.headlineSmall,
  marginBottom: '20px',
}));
