import { GetTeamResponseDto } from '@/types/team';
import { Tag } from '@/ui/tag/tag';
import { Button, Typography, styled } from '@mui/material';
import { FC } from 'react';

type Props = {
  team: GetTeamResponseDto;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
};
export const TeamCard: FC<Props> = ({ team, onLike, onDislike }) => {
  return (
    <Root>
      <Top>
        <TopLeft>
          <Name>{team.name}</Name>
          <Description>{team.description}</Description>
        </TopLeft>
        <TopRight>
          <img src={team.avatar} alt="" />
        </TopRight>
      </Top>
      <Tags>
        {team.tags.map(tag => (
          <Tag key={tag.id}>{tag.name_en}</Tag>
        ))}
      </Tags>
      <Bottom>
        <Button variant="outlined" onClick={() => onDislike(team.id)}>
          Hide
        </Button>
        <Button variant="contained" onClick={() => onLike(team.id)}>
          Apply
        </Button>
      </Bottom>
    </Root>
  );
};

const tags = ['Machine learning', 'Neuroscience', 'Computer vision', 'Big data'];

const Root = styled('div')(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.primary.main,
  padding: '16px 24px',
  minHeight: '16rem',
  borderRadius: '12px',
  boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
}));

const Top = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
}));

const Name = styled(Typography)(({ theme }) => ({
  ...theme.typography.headlineLarge,
  fontSize: '20px',
  fontWeight: '500',
  marginBottom: '10px',
}));

const Description = styled(Typography)(({ theme }) => ({
  ...theme.typography.bodyLarge,
  fontSize: '14px',
  color: '#6B6B6B',
}));

const TopLeft = styled('div')(({ theme }) => ({
  flex: 1,
}));

const TopRight = styled('div')(({ theme }) => ({
  width: '100px',
  '& img': {
    width: '100%',
    borderRadius: '8px',
  },
}));

const Tags = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
  marginBottom: '20px',
}));

const Bottom = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
