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
              По вопросам продажи и покупки: <a href="tel:+77005006838">+7 700 500 68 38</a>{' '}
              <a href="tel:+77082791399">+7 708 279 13 99</a>
            </div>
            <span>Адрес: Толе би 59</span>
            <span>Все права защищены</span>
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
  backgroundColor: '#f0f0f7',
}));

const Footer = styled('footer')(({ theme }) => ({
  padding: '50px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: '#8b8c9e',
}));

const Socials = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '16px',
}));

const Contact = styled('div')(({ theme }) => ({
  color: 'darkgrey',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  rowGap: '20px',
}));
