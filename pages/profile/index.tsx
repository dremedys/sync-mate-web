import { Description } from '@/components/profile/description/description';
import { PersonalData } from '@/components/profile/personal-data/personal-data';
import { ProfileTags } from '@/components/profile/profile-tags/profile-tags';
import { MainLayout } from '@/layout/main-layout/main-layout';
import { useAuth } from '@/providers/auth.provider';
import { Avatar, Box, Typography, styled } from '@mui/material';
import { useState } from 'react';

export const ProfilePage = () => {
  const { profile } = useAuth();
  const [tab, setTab] = useState('profile');

  return (
    <MainLayout>
      <Root className="container">
        <LeftColumn>
          <Avatar sx={{ width: '200px', height: '200px', marginBottom: '36px' }}></Avatar>
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
            </DataBox>
          )}
        </RightColumn>
      </Root>
    </MainLayout>
  );
};

export default ProfilePage;

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: '40px',
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

const Nav = styled('div')(() => ({
  marginBottom: '20px',
  cursor: 'pointer',
}));

const Name = styled(Typography)(() => ({
  marginBottom: '64px',
}));
