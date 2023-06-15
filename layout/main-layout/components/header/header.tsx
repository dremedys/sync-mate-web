import { ActiveLink } from '@/components/active-link/active-link';
import { ProfileMenu } from '@/components/profile-menu';
import { useAuth } from '@/providers/auth.provider';
import { Box, Button, styled } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

export const Header = () => {
  const router = useRouter();
  const { authenticated, isLoading: isAuthLoading } = useAuth();
  const links = [
    // { href: '/', title: 'Home' },
    { href: '/teams', title: 'Teams' },
    { href: '/people', title: 'People' },
    { href: '/news', title: 'Blog' },
    // { href: '/our-team', title: 'Our team' },
    { href: '/about', title: 'About project' },
  ];

  const handleCreateTeam = () => {
    if (!authenticated) {
      return router.replace('/auth/sign-up', { query: { returnUrl: '/my-teams' } });
    }
    router.push('/my-teams');
  };

  return (
    <Wrapper>
      <Root className="container">
        <Left>
          <LogoWrapper>
            <Image src="/logo.png" alt="logo" width={100} height={30} />
          </LogoWrapper>
          <Navigation>
            {links.map(link => (
              <ActiveLink activeClassName="isActive" key={link.href} href={link.href} passHref>
                <NavItem>{link.title}</NavItem>
              </ActiveLink>
            ))}
          </Navigation>
          <Button onClick={handleCreateTeam} variant="contained" sx={{ ml: '24px', pb: '10px', alignSelf: 'center' }}>
            Create a team
          </Button>
        </Left>
        <Box sx={{ marginBottom: '10px' }}>
          {authenticated ? (
            <ProfileMenu />
          ) : (
            <>
              <Button sx={{ marginRight: '10px' }} variant="outlined" href="/auth/sign-in">
                Login
              </Button>
              <Button variant="outlined" href="/auth/sign-up">
                Register
              </Button>
            </>
          )}
        </Box>
      </Root>
    </Wrapper>
  );
};

const Wrapper = styled('div')(({ theme }) => ({
  borderBottom: '1px solid #CECECE',
  // justifyContent: 'space-between',
}));

const Root = styled('header')(({ theme }) => ({
  height: '70px',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
}));

const ChildrenWrapper = styled('div')(({ theme }) => ({
  flex: 1,
}));

const Left = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
}));

const Navigation = styled('nav')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '25px',
}));

const NavItem = styled('div')(({ theme }) => ({
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: 500,
  color: 'rgb(38, 40, 66)',
  paddingBottom: '21px',
  '&.isActive': {
    borderBottom: '3px solid',
    paddingBottom: '18px',
    borderColor: theme.palette.primary.main,
  },
}));

const LogoWrapper = styled('div')(({ theme }) => ({
  marginRight: '36px',
  // width: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px 0',
}));
