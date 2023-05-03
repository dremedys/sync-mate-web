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
          <ItemTitle>Improve your team</ItemTitle>
          <ItemText>
            Наша платформа является универсальной и подходит для всех возрастных категорий и полов. Мы уверены, что
            каждый человек должен следить за своим здоровьем и делать все возможное для его укрепления.
          </ItemText>
        </Item>
        <Item>
          <IconWrapper>
            <PeopleAlt />
          </IconWrapper>
          <ItemTitle>Find the best match</ItemTitle>
          <ItemText>
            Кроме того, мы предлагаем простой и удобный интерфейс, который позволяет быстро найти необходимую информацию
            и выбрать подходящие витамины.
          </ItemText>
        </Item>
        <Item>
          <IconWrapper>
            <HowToReg />
          </IconWrapper>
          <ItemTitle>Meets and chat</ItemTitle>
          <ItemText>
            Выбрав нашу платформу, вы получите надежного партнера в борьбе за свое здоровье и благополучие. Мы
            гарантируем высокое качество сервиса и индивидуальный подход к каждому клиенту.
          </ItemText>
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
