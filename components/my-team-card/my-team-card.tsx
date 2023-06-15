import { getStringFromEnum } from '@/lib/utils/enum-to-options';
import { useAuth } from '@/providers/auth.provider';
import { GetMyTeamResponseDto } from '@/types/team';
import { CardItem } from '@/ui/card-item/card-item';
import { Tag } from '@/ui/tag/tag';
import { Box, Button, Avatar as MuiAvatar, Typography, styled } from '@mui/material';
import { useRouter } from 'next/router';
import { FC } from 'react';

type Props = {
  team: GetMyTeamResponseDto;
};
export const MyTeamCard: FC<Props> = ({ team }) => {
  const { profile } = useAuth();
  const router = useRouter();

  return (
    <CardItem>
      <Top>
        <Box>
          <Typography mb="10px" variant="headlineSmall">
            {team.name}
          </Typography>
          <Typography variant="titleSmall" color="#6B6B6B">
            Max number of members: {team.max_members}
          </Typography>
        </Box>
        <Avatar src={team.avatar} />
      </Top>
      <About>
        <Typography mb="5px" variant="titleSmall" color="#6B6B6B">
          About the team
        </Typography>
        <Typography variant="bodyLarge">{team.description}</Typography>
      </About>
      <About>
        <Typography mb="5px" variant="titleSmall" color="#6B6B6B">
          Tags
        </Typography>
        <Tags>
          {team.tags.map(tag => (
            <Tag key={tag.id}>{tag.name_en}</Tag>
          ))}
        </Tags>
      </About>
      <About>
        <Typography mb="5px" variant="titleSmall" color="#6B6B6B">
          Members
        </Typography>
        <Members>
          <Person>
            <Avatar src="https://media.licdn.com/dms/image/D4D03AQHDLXiyzu_4Cg/profile-displayphoto-shrink_800_800/0/1685433769858?e=1691020800&v=beta&t=VkHqwYECMG-1Y8_dlKUXQxTsiP8GxNx4kwDva_sODLA"></Avatar>
            <Typography mb="5px" color="#6B6B6B">
              Dariga Abdikarimova
            </Typography>
            <Typography color="#A8A8A8">Admin</Typography>
          </Person>
          {team.members.map(member => (
            <Person key={member.id}>
              <Avatar src={member.avatar}></Avatar>
              <Typography mb="5px" color="#6B6B6B">
                {member.full_name}
              </Typography>
              <Typography color="#A8A8A8">{getStringFromEnum(member.interaction)}</Typography>
            </Person>
          ))}
        </Members>
      </About>
      <Button
        variant="contained"
        onClick={() => {
          router.push('/messages');
        }}>
        Go to the chat
      </Button>
    </CardItem>
  );
};

const Top = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
  borderBottom: '1px solid gray',
  paddingBottom: '20px',
}));

const About = styled('div')(() => ({
  marginBottom: '20px',
  borderBottom: '1px solid gray',
  paddingBottom: '20px',
}));

const Tags = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
  marginBottom: '20px',
}));

const Members = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridColumnGap: '12px',
}));

const Person = styled('div')(() => ({}));

const Avatar = styled(MuiAvatar)(() => ({
  width: '100px',
  height: '100px',
  borderRadius: '12px',
  marginBottom: '10px',
}));
