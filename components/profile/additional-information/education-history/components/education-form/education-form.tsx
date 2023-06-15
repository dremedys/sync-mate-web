import { toast } from '@/components/toast/toast';
import { getStringFromEnum, transformEnumToOptions } from '@/lib/utils/enum-to-options';
import { getUniversities } from '@/services/university';
import { Option } from '@/types/common';
import { CreateOrUpdateEducationResponseDto, GetEducationResponseDto, StudentDegree } from '@/types/profile';
import { SelectField } from '@/ui/SelectField/SelectField';
import SelectInput from '@/ui/SelectInput';
import { LoadingButton } from '@mui/lab';
import { TextField, Typography, styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  education?: GetEducationResponseDto;
  onSubmit?: (body: CreateOrUpdateEducationResponseDto) => void;
  className?: string;
  isLoading?: boolean;
  isDeleting?: boolean;
  onDelete?: () => void;
};

export const EducationForm: FC<Props> = ({ education, onSubmit, className, isLoading, isDeleting, onDelete }) => {
  const {
    formState: { errors },
    reset,
    register,
    watch,
    setValue,
    handleSubmit,
  } = useForm<CreateOrUpdateEducationResponseDto>();
  const [universityOptions, setUniversityOptions] = useState<Option[]>([]);
  const degreeOptions = transformEnumToOptions(StudentDegree);
  const [isLoadingUnis, setLoadingUnis] = useState(false);
  const universityVal = watch('school_id');
  const degreeVal = watch('degree');

  const isSubmittable = !!onSubmit;

  const fetchUniversityOptions = async (search?: string) => {
    setLoadingUnis(true);
    try {
      const { data } = await getUniversities();
      setUniversityOptions(data.results.map(item => ({ label: item.name, value: item.id.toString() })));
      return data.results.map(item => ({ label: item.name, value: item.id.toString() }));
    } catch (e) {
      toast.error('Error');
    }
  };

  const onSubmit_ = handleSubmit(async values => {
    onSubmit?.({ ...values, gpa: +values.gpa, school_id: values.school_id });
  });

  useEffect(() => {
    reset({ ...education, school_id: education?.id });
  }, [education]);

  useEffect(() => {
    fetchUniversityOptions();
  }, []);

  return (
    <Form className={className} onSubmit={onSubmit_}>
      <FieldWrap>
        <Label>School</Label>
        <SelectField
          onChange={val => {
            if (!val) return;
            setValue('school_id', +val);
          }}
          value={universityOptions.find(item => item.value === universityVal?.toString())}
          options={universityOptions}
          onLoadOptions={val => {
            fetchUniversityOptions(val);
          }}
        />
      </FieldWrap>
      <FieldWrap>
        <Label>Degree</Label>
        <SelectField
          onChange={val => {
            if (!val) return;
            setValue('degree', val.toString() as StudentDegree);
          }}
          value={{ label: getStringFromEnum(degreeVal), value: degreeVal }}
          options={degreeOptions}
        />
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
        <Label>End date</Label>
        <DatePicker
          onChange={val => {
            setValue('end_date', dayjs(val as Dayjs).format('YYYY-MM-DD'));
          }}
        />
      </FieldWrap>
      <FieldWrap>
        <Label>GPA</Label>
        <TextField {...register('gpa')} name="gpa" />
      </FieldWrap>
      <FieldWrap>
        <Label>Field of study</Label>
        <TextField {...register('field_of_study')} name="field_of_study" />
      </FieldWrap>
      <ActivityFieldWrap>
        <Label>Activities and societies</Label>
        <ActivityField {...register('activity')} name="activity" multiline minRows={5} />
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
