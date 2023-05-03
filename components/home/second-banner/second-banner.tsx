import 'swiper/css';
import 'swiper/css/pagination';

import { theme } from '@/theme';
import { Typography, styled, useMediaQuery } from '@mui/material';
import Image from 'next/image';

export const SecondBanner = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const height = isMobile ? '100vh' : '500px';

  return (
    <Root>
      <FirstBannerWrapper>
        <Container className="container">
          <ImageWrapper>
            <Image
              style={{ borderRadius: '8px' }}
              src="/images/laptop-coffee.png"
              width={1000}
              height={625}
              layout="responsive"
              objectFit="cover"
            />
          </ImageWrapper>
          <Content>
            <Title variant="h3">Select your interests and purposes</Title>
            <Description>Find your best match team or teammate to build the project of your team</Description>
          </Content>
        </Container>
      </FirstBannerWrapper>
    </Root>
  );
};

const Root = styled('div')`
  margin-bottom: 80px;
  background: rgba(222, 224, 250, 0.2);
`;

const BannerWrapper = styled('div')`
  width: 100%;
  position: relative;
  height: 100%;

  //height: 435px;
  padding: 50px;
`;

const FirstBannerWrapper = styled(BannerWrapper)`
  //background: #7681fc;
`;

const SecondBannerWrapper = styled(BannerWrapper)`
  background: #ff5733;
`;

export const Container = styled('div')`
  display: flex;
  height: 100%;
  padding: 0;
  z-index: 100;
  justify-content: space-between;
  align-items: center;
  ${props => props.theme.breakpoints.down('md')} {
    flex-direction: column;
  }
`;

export const Content = styled('div')`
  width: 50%;
  ${props => props.theme.breakpoints.down('md')} {
    width: 100%;
  }
`;

export const ImageWrapper = styled('div')`
  width: 506px;
  height: 100%;
  ${props => props.theme.breakpoints.down('md')} {
    width: 100%;
  }
`;

export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: '24px',
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

const Description = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  color: 'grey',
}));
