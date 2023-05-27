import { authService, useAuth } from '@/providers/auth.provider';
import { getCities, getCountries } from '@/services/geoname';
import { UpdateProfileRequestDto } from '@/types/auth';
import { Label, LoadingButton, TextField } from '@/ui';
import { SelectField } from '@/ui/SelectField/SelectField';
import { FormControl, styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

type CityAndDateFormValues = Pick<UpdateProfileRequestDto, 'city_name' | 'country_name' | 'date_of_birth'>;

type Props = {
  onNextStep: () => void;
};

export const CityAndDate: FC<Props> = ({ onNextStep }) => {
  const [loading, setLoading] = useState(false);
  const { profile } = useAuth();
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    setValue,
  } = useForm<CityAndDateFormValues>();

  const countryVal = watch('country_name');

  const { data: countryOptions, isLoading: isLoadingCountries } = useQuery(['countries'], async () => {
    try {
      const { data } = await getCountries();
      return data.geonames.map(gn => ({ label: gn.countryName, value: gn.countryCode }));
    } catch (e) {
      console.log(e);
      return [];
    }
  });

  const { data: cityOptions, isLoading: loadingCities } = useQuery(['cities', countryVal], async () => {
    try {
      const cc = countryOptions?.find(item => item.label === countryVal)?.value;
      if (!cc) return [];
      const { data } = await getCities({ country: cc });
      return data.geonames.map(gn => ({ label: gn.name, value: gn.name }));
    } catch (e) {
      console.log(e);
      return [];
    }
  });

  const onSubmit = handleSubmit(async values => {
    setLoading(true);

    try {
      await authService.updateProfile(values);
      onNextStep();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
      <FormControl fullWidth>
        <Label hasError={!!errors.city_name}>Country</Label>
        <SelectField
          isSearchable
          isLoading={isLoadingCountries}
          options={countryOptions || []}
          onChange={val => {
            const newVal = countryOptions?.find(c => c.value === val);
            if (!newVal) return;
            setValue('country_name', newVal.label);
          }}
        />
      </FormControl>
      <FormControl fullWidth>
        <Label hasError={!!errors.city_name}>City</Label>
        <StyledSelectField
          isLoading={loadingCities}
          options={cityOptions || []}
          onChange={val => {
            if (!val) return;
            setValue('city_name', val);
          }}
        />
      </FormControl>
      <LoadingButton fullWidth loading={loading} variant="contained" type="submit">
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
