import { CityAndDate } from '@/components/auth/sign-up/city-and-date';
import { CreateAccountStep } from '@/components/auth/sign-up/create-account-step';
import { ImagesForm } from '@/components/auth/sign-up/images-form';
import { Interests } from '@/components/auth/sign-up/interests';
import { AuthLayout } from '@/layout/auth-layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const signUpSteps = ['create', 'locationAndDate', 'interests', 'images'] as const;
export type SignUpStep = (typeof signUpSteps)[number];

export const SignUp = () => {
  const router = useRouter();

  const currentStep = router.query.step as SignUpStep;

  useEffect(() => {
    if (router.isReady && !currentStep) {
      router.replace('/auth/sign-up?step=create');
    }
  }, [currentStep, router]);

  const handleNextStep = (step: SignUpStep) => {
    if (signUpSteps.indexOf(step) + 1 === signUpSteps.length) {
      router.push('/teams');
      return;
    }
    router.push({ query: { step: signUpSteps[signUpSteps.indexOf(step) + 1] } });
  };

  const stepsAndTitleMapping: Record<SignUpStep, string> = {
    create: 'Join us!',
    locationAndDate: 'Complete your profile',
    interests: 'Complete your profile',
    images: 'Complete your profile',
  };

  const stepsAndSubtitleMapping: Record<SignUpStep, string> = {
    create: 'Create your profile to be part of our team.ts',
    locationAndDate: 'Add a few details about yourself so people can find you',
    interests: 'Select tags so you can easily find the team.ts and the team.ts can find you',
    images: 'Add your photo so others can trust you',
  };

  const stepsLittleName: Record<SignUpStep, string> = {
    create: 'General Info',
    locationAndDate: 'Personalization.',
    interests: 'Description',
    images: 'Images',
  };

  const formsMap: Record<SignUpStep, any> = {
    create: <CreateAccountStep onNextStep={() => handleNextStep('create')} />,
    locationAndDate: <CityAndDate onNextStep={() => handleNextStep('locationAndDate')} />,
    interests: <Interests onNextStep={() => handleNextStep('interests')} />,
    images: <ImagesForm onNextStep={() => handleNextStep('images')} />,
  };

  return (
    <AuthLayout
      stepName={stepsLittleName[currentStep]}
      stepNumber={signUpSteps.indexOf(currentStep) + 1}
      stepsCount={4}
      title={stepsAndTitleMapping[currentStep]}
      subtitle={stepsAndSubtitleMapping[currentStep]}>
      {formsMap[currentStep]}
    </AuthLayout>
  );
};

export default SignUp;
