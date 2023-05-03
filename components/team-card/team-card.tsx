import { Tag } from '@/ui/tag/tag';
import { Button, Typography, styled } from '@mui/material';

export const TeamCard = () => {
  return (
    <Root>
      <Top>
        <TopLeft>
          <Name>Startup project team</Name>
          <Description>
            We are looking for inspired people for our AI application which helps people to find a team. If you know
            about computer science and you have analytics, join our team
          </Description>
        </TopLeft>
        <TopRight>
          <img src="https://mpost.io/wp-content/uploads/image-74-7-1024x1024.jpg" alt="" />
        </TopRight>
      </Top>
      <Tags>
        {tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>
      <Bottom>
        <Button variant="outlined">Hide</Button>
        <Button variant="contained">Apply</Button>
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
  fontSize: '20px',
  fontWeight: '500',
  marginBottom: '10px',
}));

const Description = styled(Typography)(({ theme }) => ({
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
