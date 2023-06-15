import { AdditionalInformation } from '@/components/profile/additional-information/additional-information';
import { Certificates } from '@/components/profile/certificates/certificates';
import { Description } from '@/components/profile/description/description';
import { PersonalData } from '@/components/profile/personal-data/personal-data';
import { ProfileTags } from '@/components/profile/profile-tags/profile-tags';
import { MainLayout } from '@/layout/main-layout/main-layout';
import { NextPageWithLayout } from '@/pages/_app';
import { useAuth } from '@/providers/auth.provider';
import { Avatar, Box, Typography, styled } from '@mui/material';
import { useState } from 'react';

export const ProfilePage: NextPageWithLayout = () => {
  const { profile } = useAuth();
  const [tab, setTab] = useState('profile');

  return (
    <Root className="container">
      <LeftColumn>
        <Avatar src={profile?.avatar} sx={{ width: '200px', height: '200px', marginBottom: '36px' }}></Avatar>
        <Name>{profile?.full_name}</Name>
        <Box>
          <Nav onClick={() => setTab('profile')}>Profile</Nav>
          <Nav onClick={() => setTab('settings')}>Setting</Nav>
        </Box>
      </LeftColumn>
      <RightColumn>
        {tab === 'settings' ? (
          <Box>
            <PersonalData />
          </Box>
        ) : (
          <DataBox>
            <Description />
            <ProfileTags />
            <AdditionalInformation />
            <Certificates />
          </DataBox>
        )}
      </RightColumn>
    </Root>
  );
};

ProfilePage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default ProfilePage;

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: '40px',
  marginBottom: '100px',
  justifyContent: 'space-between',
}));

const LeftColumn = styled('div')(() => ({
  width: '20%',
}));

const RightColumn = styled('div')(() => ({
  width: '70%',
}));

const DataBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '20px',
}));

const Nav = styled('div')(({ theme }) => ({
  ...theme.typography.headlineMedium,
  marginBottom: '20px',
  cursor: 'pointer',
}));

const Name = styled(Typography)(({ theme }) => ({
  ...theme.typography.headlineLarge,
  marginBottom: '64px',
}));
