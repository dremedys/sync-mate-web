import { MainLayout } from '@/layout/main-layout/main-layout';
import { NextPageWithLayout } from '@/pages/_app';
import { Avatar, Card, Typography, styled } from '@mui/material';

export const OurTeam: NextPageWithLayout = () => {
  return (
    <Root className="container">
      <Typography variant="h3" mb="32px">
        Our team
      </Typography>
      <Grid>
        <Item>
          <MemberPhoto src="/images/darik.png" />
          <Name>Dariga Abdikarimova, CEO</Name>
          <MemberText>Middle Software Engineer at DAR, KBTU IS 4 year</MemberText>
        </Item>
        <Item>
          <MemberPhoto src="/images/aigul.png" />
          <Name>Aigul Amangaliyeva, UI/UX designer</Name>
          <MemberText>
            Intern of Department of Automation at TCO(Tengiz) <br />
            Intern of Department of Automation at KazTransOil <br />
            An entrepreneur engineer creating first startup has high technical competence and innovative thinking, is
            ready to take risks and confidently go towards his goal of creating an innovative product.
          </MemberText>
        </Item>
        <Item>
          <MemberPhoto src="/images/bina.jpg" />
          <Name>Gulbina Bolatbekkyzy, Software Engineer</Name>
          <MemberText>
            Backend developer at OneDev. A person who just loves life and wants to get the most out of it. Likes to
            write thoughts and feelings. It seems she has not bad analytical skills.
          </MemberText>
        </Item>
        <Item>
          <MemberPhoto src="/images/danel.png" />
          <Name>Omirkhanova Danel, Marketing</Name>
          <MemberText>
            Intern of Department of Automation at Schneider Electric. <br />
            Intern of Department of Automation at CCI (Coca-Cola Almaty Bottlers). <br />A technically skilled and
            innovative entrepreneur, embarking on their first startup, has the willingness to take risks and the
            determination to achieve their goal of bringing a new and innovative product to the market.
          </MemberText>
        </Item>
      </Grid>
    </Root>
  );
};

const Root = styled('div')`
  margin-bottom: 64px;
  margin-top: 64px;
`;

const Grid = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  rowGap: '25px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const Item = styled(Card)(({ theme }) => ({
  width: '49%',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '500px',
  // justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginBottom: '24px',
  },
}));
const Name = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  textAlign: 'center',
}));

const MemberText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  marginBottom: '20px',
  color: 'darkgrey',
}));

const MemberPhoto = styled(Avatar)(({ theme }) => ({
  width: '200px',
  height: '200px',
  marginBottom: '20px',
}));

OurTeam.getLayout = page => <MainLayout>{page}</MainLayout>;

export default OurTeam;
