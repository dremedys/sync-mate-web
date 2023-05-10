import { TAGS } from '@/pages/teams';
import { authService } from '@/providers/auth.provider';
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
  const tagsValue = watch('user_tag_ids');
  const notSelectedTags = tags.filter(t => !tagsValue?.includes(t.value));

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
      <StyledTextField
        {...register('bio')}
        hasError={!!errors.bio}
        label="About me"
        placeholder="Enter..."
        variant="outlined"
        minRows={5}
        name="bio"
        multiline
        fullWidth
      />
      <StyledSelectField
        label="Tags"
        options={notSelectedTags.map(t => ({ ...t, value: String(t.value) }))}
        onChange={val => {
          if (val) setValue('user_tag_ids', [...(tagsValue || []), +val]);
        }}
      />
      <Tags>
        {tagsValue?.map(t => (
          <Tag
            onRemove={() => {
              setValue(
                'user_tag_ids',
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

const StyledTextField = styled(TextField)`
  margin-bottom: 20px;
  .MuiOutlinedInput-root {
    padding: 11px 16px 42px;
    border: 1px solid #e0e3ea;
    border-radius: 8px;

    .Mui-disabled {
      background-color: transparent;

      & + fieldset {
        border-color: transparent;
      }
    }

    textarea {
      padding: 0;
      border: none;
      border-radius: 0;
    }

    fieldset {
      border-color: transparent;
    }

    &:hover {
      fieldset {
        border-color: transparent;
      }
    }

    &:focus,
    &:active {
      outline: none;
      box-shadow: none;

      textarea,
      fieldset {
        outline: none;
        box-shadow: none;
      }
    }
  }
`;

const StyledSelectField = styled(SelectField)`
  margin-bottom: 20px;
`;

const Tags = styled('div')(() => ({
  display: 'flex',
  alignItems: 'stretch',
  columnGap: '8px',
  rowGap: '8px',
  flexWrap: 'wrap',
  marginBottom: '20px',
}));
