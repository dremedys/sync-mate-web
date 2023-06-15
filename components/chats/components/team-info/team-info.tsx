import { GetChatTeamResponseDto } from '@/types/team';
import { Tag } from '@/ui/tag/tag';
import { InfoOutlined } from '@mui/icons-material';
import { Avatar, Typography, styled } from '@mui/material';
import { FC } from 'react';

type Props = {
  team?: GetChatTeamResponseDto;
};
export const TeamInfo: FC<Props> = ({ team }) => {
  if (!team) return <h1></h1>;
  return (
    <Root>
      <Header>
        <span> Information</span>
        <InfoOutlined />
      </Header>
      <Property>Photo</Property>
      <Photo src={team.avatar} />
      <Property>About the team</Property>
      <Typography variant="body2" color="#6B6B6B" marginBottom="20px">
        {team?.description}
      </Typography>
      <Property>Team tags</Property>
      <Tags>
        {team?.tags.map(tag => (
          <Tag key={tag.id}>{tag.name_en}</Tag>
        ))}
      </Tags>
      <Property>Teammates</Property>
    </Root>
  );
};

const Root = styled('div')(() => ({
  padding: '16px 20px',
}));

const Header = styled('div')(({ theme }) => ({
  ...theme.typography.titleMedium,
  display: 'flex',
  alignItems: 'center',
  columnGap: '14px',
}));

const Photo = styled(Avatar)(() => ({
  borderRadius: '6px',
  width: '100px',
  height: '100px',
  marginBottom: '20px',
}));

const Tags = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
  marginBottom: '20px',
}));

const Property = styled(Typography)(({ theme }) => ({
  ...theme.typography.titleSmall,
  color: '#6B6B6B',
  marginBottom: '20px',
}));
