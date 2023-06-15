import { styled } from '@mui/material';
import Image from 'next/image';
import { FC, ReactNode } from 'react';

import { Header } from './components';

type Props = {
  children: ReactNode;
};

export const MainLayout: FC<Props> = ({ children }: Props) => {
  return (
    <Root>
      <Header />
      <ChildrenWrapper>{children}</ChildrenWrapper>
      <FooterWrapper>
        <Footer className="container">
          <LogoWrapper>
            <Image src="/logo.png" alt="logo" width={1019} height={245} />
          </LogoWrapper>
          <Contact>
            <div>
              Questions about sells and products: <a href="tel:+77005006838">+7 700 500 68 38</a>{' '}
              <a href="tel:+77082791399">+7 708 279 13 99</a>
            </div>
            <span>Tole bi 59</span>
            <span>All right reserved</span>
            <Socials>
              <a href="https://t.me/pochemuvsenesvobodno">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png" />
              </a>
              <a href="https://instagram.com/_syncmate_?igshid=NTc4MTIwNjQ2YQ==">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"
                  alt="insta"
                />
              </a>
            </Socials>
          </Contact>
        </Footer>
      </FooterWrapper>
    </Root>
  );
};

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '100vh',
}));

const ChildrenWrapper = styled('div')(({ theme }) => ({
  flex: 1,
}));

const LogoWrapper = styled('div')(({ theme }) => ({
  marginRight: '36px',
  width: '125px',
}));

const FooterWrapper = styled('div')(({ theme }) => ({
  background: '#161616',
}));

const Footer = styled('footer')(({ theme }) => ({
  padding: '50px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'white',
}));

const Socials = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '16px',
  '& img': {
    width: '30px',
  },
}));

const Contact = styled('div')(({ theme }) => ({
  color: 'white',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  rowGap: '20px',
}));
