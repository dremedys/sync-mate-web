import { MainLayout } from '@/layout/main-layout/main-layout';
import { Avatar, Card, Typography, styled } from '@mui/material';

export const AboutPage = () => {
  return (
    <MainLayout>
      <Root className="container">
        <Typography variant="h2" mb="32px">
          О нас
        </Typography>
        <Typography variant="body1" color="text.secondary" mb="32px">
          Наша платформа предлагает удобный способ заказа лекарств и витаминов, а также персонализированную рекомендацию
          по подбору витаминов. Для того, чтобы воспользоваться нашими услугами, клиентам нужно всего лишь
          зарегистрироваться на нашем сайте.
          <br />
          После регистрации, клиенты могут создавать заказы на лекарства и витамины в удобное для них время. Наша
          платформа предоставляет широкий ассортимент лекарств и витаминов от проверенных производителей, поэтому каждый
          клиент может найти необходимые ему препараты.
          <br />
          Кроме того, мы предлагаем услугу персонализированной рекомендации по подбору витаминов. Клиентам нужно
          ответить на вопросы, в которой они указывают свои основные потребности в питании и здоровье, а также привычки
          и образ жизни, и нежелательные продукты. На основе этих данных наша система сформирует персонализированный
          набор витаминов, исходя из индивидуальных потребностей каждого клиента.
        </Typography>
        <Typography variant="h3" mb="32px">
          Наша команда
        </Typography>
        <Grid>
          <Item>
            <Name>Dariga Abdikarimova</Name>
            <MemberText>Middle Software Engineer at DAR, KBTU IS 4 year</MemberText>
            <MemberPhoto src="/images/darik.png" />
          </Item>
          <Item>
            <Name>Gulbina Bolatbekkyzy</Name>
            <MemberText>Data Analytics, Backend developer intern, KBTU IS 4 year</MemberText>
            <MemberPhoto src="/images/bina.jpg" />
          </Item>
          <Item>
            <Name>Aigul Aigali</Name>
            <MemberText>Designer , KBTU 4 AU year</MemberText>
            <MemberPhoto src="/images/aigul.png" />
          </Item>
        </Grid>
      </Root>
    </MainLayout>
  );
};

const Root = styled('div')`
  margin-bottom: 64px;
`;

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
const Name = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  marginBottom: '20px',
}));

const MemberText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  marginBottom: '20px',
}));

const MemberPhoto = styled(Avatar)(({ theme }) => ({
  width: '200px',
  height: '200px',
}));

export default AboutPage;
