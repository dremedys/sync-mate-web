import { authService } from '@/providers/auth.provider';
import { theme } from '@/theme';
import { SignUpRequestDto } from '@/types/auth';
import { LoadingButton, TextField } from '@/ui';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Checkbox, InputAdornment, Typography, styled } from '@mui/material';
import Link from 'next/link';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type Props = {
  onNextStep: () => void;
};

export const CreateAccountStep: FC<Props> = ({ onNextStep }) => {
  const [loading, setLoading] = useState(false);

  const [isShown, setIsShown] = useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<SignUpRequestDto>();

  const isAccepted = watch('is_signed');

  const onSubmit = handleSubmit(async values => {
    setLoading(true);

    try {
      const res = await authService.signUp(values);
      authService.persistTokens({ access: res.access, refresh: res.refresh, expire_at: '34343434' });
      onNextStep();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Root onSubmit={onSubmit}>
      <StyledTextField
        {...register('username')}
        hasError={!!errors.username}
        fullWidth
        name="username"
        label="Username"
        autoComplete="off"
      />
      <StyledTextField {...register('email')} hasError={!!errors.email} name="email" fullWidth label="Email" />
      <StyledTextField
        {...register('full_name')}
        name="full_name"
        hasError={!!errors.full_name}
        fullWidth
        label="Your name"
      />
      <StyledTextField
        {...register('password')}
        hasError={!!errors.password}
        fullWidth
        name="password"
        type={isShown ? 'text' : 'password'}
        label="Password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <EyeButton onClick={() => setIsShown(prev => !prev)} tabIndex={-1}>
                {isShown ? <VisibilityOff /> : <Visibility />}
              </EyeButton>
            </InputAdornment>
          ),
        }}
      />
      <AgreementWrapper>
        <Agreement>
          <Controller
            name="is_signed"
            defaultValue={false}
            rules={{ required: true }}
            render={props => (
              <Checkbox
                {...props.field}
                checked={isAccepted}
                onChange={e => {
                  setValue('is_signed', e.target.checked, { shouldValidate: true });
                }}
              />
            )}
            control={control}
          />
          <OpenAgreementButton onClick={() => {}}>
            <Typography>I agree terms of policy </Typography>
            {/*<RightSign />*/}
          </OpenAgreementButton>
        </Agreement>
        <Typography color={theme.palette.error.main}>{errors.is_signed?.message}</Typography>
      </AgreementWrapper>

      <LoginBlock>
        Already have an account?
        <LoginLink href="/auth/login" passHref>
          <a>Sign in</a>
        </LoginLink>
      </LoginBlock>
      <LoadingButton fullWidth loading={loading} variant="contained" type="submit">
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

const EyeButton = styled('div')`
  width: auto;
  background: none;
  border: none;
  cursor: pointer;
`;

const AgreementWrapper = styled('div')`
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Agreement = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
`;

const OpenAgreementButton = styled('div')`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  &:hover {
    text-decoration: underline;
  }
`;
