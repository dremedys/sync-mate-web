import { ArrowBackIos } from '@mui/icons-material';
import { Typography, styled } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, ReactNode } from 'react';

type Props = {
  onBack?: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  stepNumber?: number;
  stepsCount?: number;
  stepName?: string;
};

export const AuthLayout: FC<Props> = ({ onBack, children, subtitle, title, stepNumber, stepName, stepsCount }) => {
  return (
    <Root>
      <Left>
        <Link href="/" passHref>
          <a>
            <Image src="/logo.png" alt="logo" width={200} height={61} />
          </a>
        </Link>
        <LeftImage />
      </Left>
      <Right>
        <Header>
          {onBack && (
            <Back onClick={onBack}>
              <ArrowBackIos />
              <BackText>Back</BackText>
            </Back>
          )}
          {stepName && stepNumber && (
            <StepWrapper>
              <StepNumber>
                Step 0{stepNumber}/0{stepsCount}
              </StepNumber>
              <StepName>{stepName}</StepName>
            </StepWrapper>
          )}
        </Header>
        <FormWrapper>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
          {children}
        </FormWrapper>
      </Right>
    </Root>
  );
};

const Root = styled('div')(() => ({
  display: 'flex',
  height: '100%',
  minHeight: '100vh',
}));

const padding = '70px 80px';

export const Left = styled('div')(() => ({
  flex: '0.4',
  position: 'relative',
  background: 'linear-gradient(0deg, rgba(173, 204, 247, 0.9), rgba(173, 204, 247, 0.9))',
  padding,
}));

const LeftImage = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: '-1',
  opacity: '0.5',
  background:
    'url("https://www.businesswest.co.uk/sites/default/files/styles/event_image/public/blog/featured/team_working_together_0.jpg?itok=yibWay1K")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}));

export const Right = styled('div')(() => ({
  flex: '0.6',
  background: '#FFFFFF',
  padding,
}));

const Header = styled('header')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Back = styled('div')(() => ({
  display: 'flex',
  columnGap: '8px',
}));

const BackText = styled(Typography)(() => ({}));

const StepWrapper = styled('div')(() => ({
  marginLeft: 'auto',
  textAlign: 'right',
}));

const StepNumber = styled(Typography)(() => ({
  color: 'rgba(168, 168, 168, 1)',
}));

const StepName = styled(Typography)(() => ({
  color: 'rgba(107, 107, 107, 1)',
  fontWeight: 600,
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: '12px',
  fontSize: '36px',
  fontWeight: 600,
}));

const Subtitle = styled(Typography)(() => ({
  marginBottom: '50px',
}));

const FormWrapper = styled('div')(() => ({
  width: '80%',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
}));
