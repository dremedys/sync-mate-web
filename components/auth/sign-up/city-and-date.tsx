import { UpdateProfileRequestDto } from '@/types/auth';
import { Label, LoadingButton, TextField } from '@/ui';
import { SelectField } from '@/ui/SelectField/SelectField';
import { FormControl, styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

type CityAndDateFormValues = Pick<UpdateProfileRequestDto, 'cityId' | 'birthDate' | 'countryId'>;

type Props = {
  onNextStep: () => void;
};

export const CityAndDate: FC<Props> = ({ onNextStep }) => {
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
      <FormControl fullWidth>
        <Label hasError={!!errors.birthDate}>Birth date</Label>
        <StyledDatePicker
          onChange={val => {
            setValue('birthDate', dayjs(val as Dayjs).format('DD-MM-YYYY'));
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
        <Label hasError={!!errors.cityId}>City</Label>
        <SelectField
          options={[
            { label: 'Aktau', value: 'dew' },
            { label: 'Almaty', value: 'wefef' },
            { label: 'Nursultan', value: 'wefef' },
            { label: 'Aktobe', value: 'wefef' },
            { label: 'Shymkent', value: 'wefef' },
          ]}
          onChange={val => {
            setValue('cityId', val);
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
