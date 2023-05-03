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
    console.log(signUpSteps.indexOf(step));
    if (signUpSteps.indexOf(step) + 1 === signUpSteps.length - 1) {
      router.push('/teams');
      return;
    }
    router.push({ query: { step: signUpSteps[signUpSteps.indexOf(step) + 1] } });
  };

  const stepsAndTitleMapping: Record<SignUpStep, string> = {
    create: 'Присоединитесь к нам!',
    locationAndDate: 'Завершите свой профиль',
    interests: 'Завершите свой профиль',
    images: 'Завершите свой профиль',
  };

  const stepsAndSubtitleMapping: Record<SignUpStep, string> = {
    create: 'Создайте свой профиль, чтобы быть в нашей команде',
    locationAndDate: 'Добавьте о себе пару деталей, чтобы люди смогли найти вас',
    interests: 'Выберите теги, чтобы вы смогли легко найти команду, а команда смогла найти вас',
    images: 'Добавьте свою фотографию, чтобы другие смогли доверять вам',
  };

  const stepsLittleName: Record<SignUpStep, string> = {
    create: 'General Info',
    locationAndDate: 'Personal',
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
