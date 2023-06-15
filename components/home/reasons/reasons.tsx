import { HowToReg, PeopleAlt, ThumbUp } from '@mui/icons-material';
import { Card, Typography, styled } from '@mui/material';

export const Reasons = () => {
  return (
    <Root className="container">
      {/*<Typography fontWeight={600} variant="h4" mb="30px" textAlign="center">*/}
      {/*  Почему стоит выбрать нас?*/}
      {/*</Typography>*/}
      <Grid>
        <Item>
          <IconWrapper>
            <ThumbUp />
          </IconWrapper>
          <ItemTitle>Join a team</ItemTitle>
          <ItemText>Do what you love, meet others who love it, find your community. The rest is history!</ItemText>
        </Item>
        <Item>
          <IconWrapper>
            <PeopleAlt />
          </IconWrapper>
          <ItemTitle>Find the best match</ItemTitle>
          <ItemText>
            Events are happening on just about any topic you can think of, from online gaming and photography to yoga
            and hiking.
          </ItemText>
        </Item>
        <Item>
          <IconWrapper>
            <HowToReg />
          </IconWrapper>
          <ItemTitle>Start a team</ItemTitle>
          <ItemText>You don’t have to be an expert to gather people together and explore shared interests.</ItemText>
        </Item>
      </Grid>
    </Root>
  );
};

const Root = styled('div')(({ theme }) => ({
  marginBottom: '64px',
}));

const Grid = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const Item = styled(Card)(({ theme }) => ({
  width: '30%',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginBottom: '24px',
  },
}));

const IconWrapper = styled('div')(({ theme }) => ({
  marginBottom: '32px',
  color: theme.palette.primary.main,
  '& svg': {
    width: '50px',
    height: '50px',
    '& path': {
      // fill: theme.palette.primary.main,
    },
  },
}));

const ItemTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  marginBottom: '16px',
  color: '#383942',
}));

const ItemText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: '#383942',
}));
