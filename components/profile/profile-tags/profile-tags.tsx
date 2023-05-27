import { authService, useAuth } from '@/providers/auth.provider';
import { getTags } from '@/services/tag';
import { UpdateProfileRequestDto } from '@/types/auth';
import { Option } from '@/types/common';
import { CardItem } from '@/ui/card-item/card-item';
import { SelectField } from '@/ui/SelectField/SelectField';
import { Tag } from '@/ui/tag/tag';
import { Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const ProfileTags = () => {
  const { profile } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileRequestDto>();

  useEffect(() => {
    reset({ tag_ids: profile?.tags.map(item => item.id) });
  }, [profile]);

  const fetchTags = async () => {
    const { data } = await getTags({ page: 1, limit: 100 });
    setTags(data.results.map(item => ({ label: item.name_en, value: item.id })));
  };

  const [tags, setTags] = useState<Option<number>[]>([]);
  const tagsValue = watch('tag_ids');
  const notSelectedTags = tags.filter(t => !tagsValue?.includes(t.value));

  const onSubmit = async (values: UpdateProfileRequestDto) => {
    try {
      await authService.updateProfile(values);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <CardItem>
      <Title>Tags</Title>
      <form>
        <StyledSelectField
          isSearchable
          options={notSelectedTags.map(t => ({ ...t, value: String(t.value) }))}
          onChange={val => {
            if (val) setValue('tag_ids', [...(tagsValue || []), +val]);
          }}
        />
      </form>
      <Tags>
        {tagsValue?.map(t => (
          <Tag
            onRemove={() => {
              setValue(
                'tag_ids',
                tagsValue.filter(a => a !== t),
              );
            }}
            key={t}>
            {tags?.find(a => a.value === t)?.label}
          </Tag>
        ))}
      </Tags>
    </CardItem>
  );
};

const Title = styled(Typography)(() => ({
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

const StyledSelectField = styled(SelectField)`
  & div {
    margin-bottom: 0;
  }
  margin-bottom: 24px;
`;
