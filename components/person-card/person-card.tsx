import { Tag } from '@/ui/tag/tag';
import { MoreVert } from '@mui/icons-material';
import { Avatar, Button, IconButton, Typography, styled } from '@mui/material';

export const PersonCard = () => {
  return (
    <Root>
      <Top>
        <TopLeft>
          <Avatar
            sx={{ width: '100px', height: '100px' }}
            src="https://mpost.io/wp-content/uploads/image-74-7-1024x1024.jpg"
            alt="Person avatar"
          />
          <Name>David King</Name>
        </TopLeft>
        <TopRight>
          <IconButton onClick={() => {}}>
            <MoreVert />
          </IconButton>
        </TopRight>
      </Top>
      <About>
        <Typography>
          Creative and impressive React developer to make your websites a masterpiece. I know little about backend,
          devops, DB, etc. I studied in KBTU so I am very clever.
        </Typography>
      </About>
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
