import { SignUpRequestDto } from '@/types/auth';
import { LoadingButton, TextField } from '@/ui';
import { styled } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  onNextStep: () => void;
};

export const CreateAccountStep: FC<Props> = ({ onNextStep }) => {
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
        Already have an account?{' '}
        <LoginLink href="/auth/login" passHref>
          <a>Sign in</a>
        </LoginLink>
      </LoginBlock>
      <LoadingButton fullWidth loading={false} variant="contained" type="submit">
        Sign up
      </LoadingButton>
    </Root>
  );
};

const Root = styled('form')(() => ({}));

const StyledTextField = styled(TextField)(() => ({
  marginBottom: '20px',
}));

const LoginBlock = styled('div')(({ theme }) => ({
  marginBottom: '20px',
  color: 'gray',
}));

const LoginLink = styled(Link)(({ theme }) => ({
  margin: '0 auto',
  display: 'block',
  '& a': {
    color: theme.palette.primary.main,
  },
}));
