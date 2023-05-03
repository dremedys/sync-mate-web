import { TAGS } from '@/pages/teams';
import { UpdateProfileRequestDto } from '@/types/auth';
import { Option } from '@/types/common';
import { LoadingButton, TextField } from '@/ui';
import { SelectField } from '@/ui/SelectField/SelectField';
import { Tag } from '@/ui/tag/tag';
import { styled } from '@mui/material';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  onNextStep: () => void;
};

export const Interests: FC<Props> = ({ onNextStep }) => {
  const {
    handleSubmit,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileRequestDto>();

  const [tags, setTags] = useState<Option<number>[]>(TAGS.map(item => ({ label: item, value: Math.random() })));
  const tagsValue = watch('tagIds');
  const notSelectedTags = tags.filter(t => !tagsValue?.includes(t.value));

  const onSubmit = handleSubmit(values => {
    onNextStep();
  });

  return (
    <Root onSubmit={onSubmit}>
      <StyledSelectField
        options={notSelectedTags.map(t => ({ ...t, value: String(t.value) }))}
        onChange={val => {
          if (val) setValue('tagIds', [...(tagsValue || []), +val]);
        }}
      />
      <Tags>
        {tagsValue?.map(t => (
          <Tag
            onRemove={() => {
              setValue(
                'tagIds',
                tagsValue?.filter(a => a !== t),
              );
            }}
            key={t}>
            {tags?.find(a => a.value === t)?.label}
          </Tag>
        ))}
      </Tags>
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

const Tags = styled('div')(() => ({
  display: 'flex',
  alignItems: 'stretch',
  columnGap: '8px',
  rowGap: '8px',
  flexWrap: 'wrap',
  marginBottom: '20px',
}));
