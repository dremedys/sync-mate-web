import { getStringFromEnum, transformEnumToOptions } from '@/lib/utils/enum-to-options';
import { CreateOrUpdateWorkDto, EmploymentType, GetWorkDto } from '@/types/profile';
import { SelectField } from '@/ui/SelectField/SelectField';
import SelectInput from '@/ui/SelectInput';
import { LoadingButton } from '@mui/lab';
import { TextField, Typography, styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  work?: GetWorkDto;
  onSubmit?: (body: CreateOrUpdateWorkDto) => void;
  className?: string;
  isLoading?: boolean;
  isDeleting?: boolean;
  onDelete?: () => void;
};

export const WorkForm: FC<Props> = ({ work, onSubmit, className, isLoading, isDeleting, onDelete }) => {
  const {
    formState: { errors, isValid },
    reset,
    register,
    watch,
    setValue,
    handleSubmit,
  } = useForm<CreateOrUpdateWorkDto>();
  const degreeOptions = transformEnumToOptions(EmploymentType);
  const [isLoadingUnis, setLoadingUnis] = useState(false);
  const emplTypeVal = watch('employment_type');

  const onSubmit_ = handleSubmit(async values => {
    onSubmit?.({ ...values });
  });
  useEffect(() => {
    console.log(isValid);
  }, [isValid]);

  return (
    <Form className={className} onSubmit={onSubmit_}>
      <FieldWrap>
        <Label>Company</Label>
        <TextField {...register('company_name')} name="company_name" />
      </FieldWrap>
      <FieldWrap>
        <Label>Start date</Label>
        <DatePicker
          onChange={val => {
            setValue('start_date', dayjs(val as Dayjs).format('YYYY-MM-DD'));
          }}
        />
      </FieldWrap>
      <FieldWrap>
        <Label>Position</Label>
        <TextField {...register('position')} name="position" />
      </FieldWrap>{' '}
      <FieldWrap>
        <Label>End date</Label>
        <DatePicker
          onChange={val => {
            setValue('end_date', dayjs(val as Dayjs).format('YYYY-MM-DD'));
          }}
        />
      </FieldWrap>
      <FieldWrap>
        <Label>Location</Label>
        <TextField {...register('location')} name="location" />
      </FieldWrap>
      <FieldWrap>
        <Label>Employment type</Label>
        <SelectField
          onChange={val => {
            if (!val) return;
            setValue('employment_type', val.toString() as EmploymentType);
          }}
          value={{ label: getStringFromEnum(emplTypeVal), value: emplTypeVal }}
          options={degreeOptions}
        />
      </FieldWrap>
      <ActivityFieldWrap>
        <Label>Responsibilities and description</Label>
        <ActivityField {...register('description')} name="description" multiline minRows={5} />
      </ActivityFieldWrap>
      <ButtonsGroup>
        {onDelete && (
          <LoadingButton onClick={onDelete} loading={isDeleting}>
            Delete
          </LoadingButton>
        )}
        <LoadingButton loading={isLoading} onClick={onSubmit_} type="submit" variant="contained">
          Save
        </LoadingButton>
      </ButtonsGroup>
    </Form>
  );
};

const Form = styled('form')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: '40px',
  rowGap: '20px',
}));

const StyledSelectField = styled(SelectInput)`
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

const ActivityFieldWrap = styled('div')(() => ({
  display: 'flex',
  columnGap: '20px',
  width: '100%',
  marginBottom: '20px',
}));

const Label = styled(Typography)(({ theme }) => ({
  ...theme.typography.titleSmall,
}));

const ActivityField = styled(TextField)(() => ({
  '& textarea': { padding: 0 },
  flex: 1,
}));

const ButtonsGroup = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
}));
