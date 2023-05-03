import { SignIn } from '@/components/auth/sign-in/sign-in';
import { AuthLayout } from '@/layout/auth-layout';

export const LoginPage = () => {
  return (
    <AuthLayout title="Sign in">
      <SignIn onNextStep={() => {}} />
    </AuthLayout>
  );
};

export default LoginPage;
