import { UpdateProfileRequestDto } from '@/types/auth';
import { LoadingButton, TextField } from '@/ui';
import { SelectField } from '@/ui/SelectField/SelectField';
import { styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

type CityAndDateFormValues = Pick<UpdateProfileRequestDto, 'cityId' | 'birthDate' | 'countryId'>;

type Props = {
  onNextStep: () => void;
};

export const ImagesForm: FC<Props> = ({ onNextStep }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<CityAndDateFormValues>();

  const onSubmit = handleSubmit(values => {
    console.log(values);
    onNextStep();
  });

  return (
    <Root onSubmit={onSubmit}>
      <div>WIP</div>
      <LoadingButton fullWidth loading={false} variant="contained" type="submit">
        Continue
      </LoadingButton>
    </Root>
  );
};

const Root = styled('form')(() => ({}));

const StyledTextField = styled(TextField)(() => ({
  marginBottom: '20px',
}));

const StyledSelectField = styled(SelectField)(() => ({
  marginBottom: '20px',
}));

const StyledDatePicker = styled(DatePicker)(() => ({
  marginBottom: '20px',
}));
