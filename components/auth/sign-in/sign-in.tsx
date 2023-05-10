import { authService, useAuth } from '@/providers/auth.provider';
import { SignInRequestDto } from '@/types/auth';
import { LoadingButton, TextField } from '@/ui';
import { styled } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const fetchTokens = async (payload: SignInRequestDto) => {
  const tokens = await authService.login(payload);
  return { tokens };
};

export const SignIn: FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  const { returnUrl } = router.query;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInRequestDto>();

  const { mutateAsync, isLoading, error } = useMutation(fetchTokens, {
    onSuccess: ({ tokens }) => {
      login(tokens, (returnUrl as string) || '/');
    },
    onError: error => {
      console.log(error);
    },
  });

  return (
    <Root
      onSubmit={handleSubmit(values => {
        mutateAsync(values);
      })}>
      <StyledTextField
        {...register('username')}
        hasError={!!errors.username}
        name="username"
        fullWidth
        label="Username"
      />
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
