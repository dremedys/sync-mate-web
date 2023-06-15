import { useAuth } from '@/providers/auth.provider';
import { Mail, Notifications } from '@mui/icons-material';
import { Avatar, Box, IconButton, Menu, MenuItem as MuiMenuItem, styled } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const ProfileMenu = () => {
  const { logout, profile } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const router = useRouter();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHref = (href: string) => {
    return () => router.push(href);
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center" columnGap="20px" mr="40px" color="primary.main">
          <IconButton onClick={handleHref('/messages')}>
            <Mail />
          </IconButton>
          <IconButton onClick={handleHref('/notifications')}>
            <Notifications />
          </IconButton>
        </Box>
        <ProfileLink onClick={handleMenu}>
          <Username>{profile?.full_name}</Username>
          <Avatar style={{ display: 'inline-flex', marginLeft: '8px', cursor: 'pointer' }} src={profile?.avatar} />
        </ProfileLink>
      </Box>

      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        style={{ marginTop: '8px', marginLeft: '15px' }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        MenuListProps={{
          style: { padding: '8px 0', width: '100%', minWidth: 'unset' },
        }}
        PaperProps={{
          style: {
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.12)',
            borderRadius: '0px 0px 4px 4px',
          },
        }}
        BackdropProps={{
          style: {
            background: 'none',
            backdropFilter: 'none',
          },
        }}>
        <MenuItem
          onClick={() => {
            router.push('/profile');
          }}>
          My profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push('/my-teams');
          }}>
          My teams
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push('/my-subscriptions');
          }}>
          My subscriptions
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            handleClose();
          }}>
          Log out
        </MenuItem>
      </Menu>
    </>
  );
};

const ProfileLink = styled('div')`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const MenuItem = styled(MuiMenuItem)`
  padding: 14px 12px;
`;

const Username = styled('span')`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  text-decoration-line: underline;
  text-align: right;
`;
