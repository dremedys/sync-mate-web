import { SignUpRequestDto } from '@/types/auth';
import { LoadingButton, TextField } from '@/ui';
import { styled } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  onNextStep: () => void;
};

export const SignIn: FC<Props> = ({ onNextStep }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpRequestDto>();

  const onSubmit = handleSubmit(values => {
    console.log(values);
    onNextStep();
  });

  return (
    <Root onSubmit={onSubmit}>
      <StyledTextField
        {...register('username')}
        hasError={!!errors.username}
        name="username"
        fullWidth
        label="Username"
      />
      <StyledTextField {...register('name')} name="name" hasError={!!errors.name} fullWidth label="Your name" />
      <StyledTextField
        {...register('password')}
        hasError={!!errors.password}
        fullWidth
        name="password"
        type="password"
        label="Password"
      />
      <LoginBlock>
        Do not have an account?{' '}
        <LoginLink href="/auth/sign-up" passHref>
          <a>Sign up</a>
        </LoginLink>
      </LoginBlock>
      <LoadingButton fullWidth loading={false} variant="contained" type="submit">
        Login
      </LoadingButton>
    </Root>
  );
};

const Root = styled('form')(() => ({}));

const StyledTextField = styled(TextField)(() => ({
  marginBottom: '20px',
}));

const LoginBlock = styled('div')(({ theme }) => ({
  color: 'gray',
  margin: '0 auto',
  textAlign: 'center',
  marginBottom: '20px',
  '& a': {
    color: theme.palette.primary.main,
  },
}));

const LoginLink = styled(Link)(({ theme }) => ({}));
