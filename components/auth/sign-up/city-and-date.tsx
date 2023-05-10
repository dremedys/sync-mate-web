import { authService, useAuth } from '@/providers/auth.provider';
import { UpdateProfileRequestDto } from '@/types/auth';
import { Label, LoadingButton, TextField } from '@/ui';
import { SelectField } from '@/ui/SelectField/SelectField';
import { FormControl, styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

type CityAndDateFormValues = Pick<UpdateProfileRequestDto, 'address' | 'date_of_birth'>;

type Props = {
  onNextStep: () => void;
};

export const CityAndDate: FC<Props> = ({ onNextStep }) => {
  const { profile } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<CityAndDateFormValues>();

  const onSubmit = handleSubmit(async values => {
    try {
      await authService.updateProfile(values);
      onNextStep();
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <Root onSubmit={onSubmit}>
      <FormControl fullWidth>
        <Label hasError={!!errors.date_of_birth}>Birth date</Label>
        <StyledDatePicker
          onChange={val => {
            setValue('date_of_birth', dayjs(val as Dayjs).format('YYYY-MM-DD'));
          }}
        />
      </FormControl>
      {/*<FormControl fullWidth>*/}
      {/*  <Label hasError={!!errors.cityId}>Country</Label>*/}
      {/*  <SelectField*/}
      {/*    options={[]}*/}
      {/*    onChange={val => {*/}
      {/*      setValue('countryId', val);*/}
      {/*      setValue('cityId', undefined);*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</FormControl>*/}
      <FormControl fullWidth>
        <Label hasError={!!errors.address?.city_id}>City</Label>
        <SelectField
          options={[
            { label: 'Aktau', value: 'dew' },
            { label: 'Almaty', value: 'wefef' },
            { label: 'Nursultan', value: 'wefef' },
            { label: 'Aktobe', value: 'wefef' },
            { label: 'Shymkent', value: 'wefef' },
          ]}
          onChange={val => {
            val && setValue('address.city_id', +val);
          }}
        />
      </FormControl>
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
