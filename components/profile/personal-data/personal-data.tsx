import { authService, useAuth } from '@/providers/auth.provider';
import { getCities, getCountries } from '@/services/geoname';
import { UpdateProfileRequestDto } from '@/types/auth';
import { CardItem } from '@/ui/card-item/card-item';
import { SelectField } from '@/ui/SelectField/SelectField';
import { LoadingButton } from '@mui/lab';
import { TextField, Typography, styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

export const PersonalData = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    getValues,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileRequestDto>({});
  const { profile } = useAuth();

  useEffect(() => {
    reset({
      username: profile?.username,
      city_name: profile?.city_name,
      country_name: profile?.country_name,
      date_of_birth: profile?.date_of_birth,
    });
  }, [profile]);

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
      await authService.updateProfile({
        ...values,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  });

  const getInitialCityOption = () => {
    if (!profile?.city_name) return undefined;
    const option = cityOptions?.find(option => option.label === getValues('city_name'));
    if (!option) return undefined;
    return option;
  };

  const getInitialCountryOption = () => {
    if (!profile?.city_name) return undefined;
    const option = countryOptions?.find(option => option.label === getValues('country_name'));
    if (!option) return undefined;
    return option;
  };

  return (
    <CardItem>
      <Title>Personal data</Title>
      <Form onSubmit={onSubmit}>
        <FieldWrap>
          <Label>Username</Label>
          <TextField fullWidth variant="outlined" {...register('username')} name="username" />
        </FieldWrap>
        <FieldWrap>
          <Label>Birth date</Label>
          <DatePicker
            onChange={val => {
              console.log(val);
              if (!val) return;
              // setValue('date_of_birth', dayjs(val).format('YYYY-MM-DD'));
            }}
          />
        </FieldWrap>

        <FieldWrap>
          <Label>Country</Label>
          <StyledSelectField
            isSearchable
            value={getInitialCountryOption()}
            isLoading={isLoadingCountries}
            options={countryOptions || []}
            onChange={val => {
              const newVal = countryOptions?.find(c => c.value === val);
              if (!newVal) return;
              setValue('country_name', newVal.label);
            }}
          />
        </FieldWrap>
        <FieldWrap>
          <Label>City</Label>
          <StyledSelectField
            value={getInitialCityOption()}
            isLoading={loadingCities}
            options={cityOptions || []}
            onChange={val => {
              if (!val) return;
              setValue('city_name', val);
            }}
          />
        </FieldWrap>
        <LoadingButton
          disabled={!isDirty}
          loading={loading}
          variant="contained"
          type="submit"
          sx={{ marginLeft: 'auto' }}>
          Save
        </LoadingButton>
      </Form>
    </CardItem>
  );
};

const Form = styled('form')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: '40px',
  rowGap: '20px',
}));

const StyledSelectField = styled(SelectField)`
  width: 100%;
  & div {
    margin-bottom: 0;
  }
`;

const FieldWrap = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '20px',
  width: '45%',
}));

const Label = styled(Typography)(() => ({
  color: '#6B6B6B',
}));

const Title = styled(Typography)(() => ({
  marginBottom: '20px',
}));
