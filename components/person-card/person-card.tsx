import { GetPersonFromListDto } from '@/types/people';
import { Tag } from '@/ui/tag/tag';
import { MoreVert } from '@mui/icons-material';
import { Avatar, Button, IconButton, Typography, styled } from '@mui/material';
import { FC } from 'react';

type Props = {
  person: GetPersonFromListDto;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
};
export const PersonCard: FC<Props> = ({ onLike, onDislike, person: { full_name, bio, tags, id, avatar } }) => {
  return (
    <Root>
      <Top>
        <TopLeft>
          <Avatar sx={{ width: '100px', height: '100px' }} src={avatar} alt="Person avatar" />
          <Name>{full_name}</Name>
        </TopLeft>
        <TopRight>
          <IconButton onClick={() => {}}>
            <MoreVert />
          </IconButton>
        </TopRight>
      </Top>
      <About>
        <Typography variant="bodyLarge">{bio}</Typography>
      </About>
      <Tags>
        {tags.map(tag => (
          <Tag key={tag.id}>{tag.name_en}</Tag>
        ))}
      </Tags>
      <Bottom>
        <Button onClick={() => onDislike(id)} variant="outlined">
          Hide
        </Button>
        <Button onClick={() => onLike(id)} variant="contained">
          Like
        </Button>
      </Bottom>
    </Root>
  );
};

const tags = ['Machine learning', 'Neuroscience', 'Computer vision', 'Big data'];

const Root = styled('div')(({ theme }) => ({
  padding: '16px 24px',
  minHeight: '16rem',
  borderRadius: '12px',
  boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.11), 0px 1px 18px rgba(0, 0, 0, 0.09), 0px 3px 5px rgba(0, 0, 0, 0.16)',
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
}));

const About = styled('div')(() => ({
  marginBottom: '20px',
}));

const TopRight = styled('div')(({ theme }) => ({}));

const TopLeft = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '20px',
  '& img': {
    width: '100px',
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
