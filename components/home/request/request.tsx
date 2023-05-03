import { FORM_LINK } from '@/constants/constants';
import { Button, Typography, styled } from '@mui/material';
import Image from 'next/image';

export const Request = () => {
  return (
    <Root className="container">
      <Left>
        <Typography variant="h3" mb="14px" fontWeight={600}>
          Оставь заявку
        </Typography>
        <Typography variant="h5" fontWeight={500} mb="24px">
          Оставайтесь на вершине здоровья и благополучия - подпишитесь на нашу форму отслеживания новостей.
        </Typography>
        <Button href={FORM_LINK} variant="outlined">
          Оставить заявку
        </Button>
      </Left>
      <Right>
        <Image src="/images/contact-us.png" width={500} height={500} layout="responsive" />
      </Right>
    </Root>
  );
};

const Root = styled('div')(({ theme }) => ({
  backgroundColor: '#2196F3',
  color: 'white',
  padding: '42px',
  borderRadius: '16px',
  height: '350px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '64px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: 'auto',
  },
}));

const Left = styled('div')(({ theme }) => ({
  width: '50%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginBottom: '32px',
  },
}));

const Right = styled('div')(({ theme }) => ({
  width: '30%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));
