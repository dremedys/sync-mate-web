import { getCities, getCountries } from '@/services/geoname';
import { getTopTags } from '@/services/tag';
import { createTeam } from '@/services/team';
import { Option } from '@/types/common';
import { CreateTeamRequestDto, GetTeamResponseDto } from '@/types/team';
import { SelectField } from '@/ui/SelectField/SelectField';
import { Tag } from '@/ui/tag/tag';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Dialog, IconButton, TextField, Typography, styled } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

type Props = {
  team?: GetTeamResponseDto;
  isOpen: boolean;
  onClose: () => void;
};

export const TeamModal: FC<Props> = ({ team, onClose, isOpen }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateTeamRequestDto>();

  const countryVal = watch('country');

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

  const fetchTopTags = async () => {
    try {
      const { data } = await getTopTags({ limit: 50, page: 1 });
      setTags(data.results.map(item => ({ label: item.name_en, value: item.id })));
    } catch (e) {
      console.log(e);
    }
  };

  const [tags, setTags] = useState<Option<number>[]>([]);
  const tagsValue = watch('tag_ids');
  const notSelectedTags = tags.filter(t => !tagsValue?.includes(t.value));

  const onSubmit = handleSubmit(async values => {
    setLoading(true);
    try {
      await createTeam({
        ...values,
        max_members: Number(values.max_members),
        avatar: 'https://mpost.io/wp-content/uploads/image-74-7-1024x1024.jpg',
      });
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchTopTags();
  }, []);

  return (
    <Dialog open={isOpen} PaperProps={{ sx: { maxWidth: 'unset' } }} onClose={onClose}>
      <Root>
        <Header>
          <Typography>Create a team</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Header>
        <Form onSubmit={onSubmit}>
          <FieldWrap>
            <Label>Team name</Label>
            <TextField
              helperText="Let's come up with a name that will interest the participant"
              fullWidth
              {...register('name')}
              name="name"
            />
          </FieldWrap>
          <FieldWrap>
            <Label>Max number of members</Label>
            <TextField fullWidth {...register('max_members')} name="max_members" />
          </FieldWrap>
          <FieldWrap>
            <Label>Description</Label>
            <StyledTextField
              {...register('description')}
              variant="outlined"
              minRows={5}
              name="description"
              multiline
              fullWidth
            />
          </FieldWrap>
          <FieldWrap>
            <Label>Country</Label>
            <StyledSelectField
              isSearchable
              isLoading={isLoadingCountries}
              options={countryOptions || []}
              onChange={val => {
                const newVal = countryOptions?.find(c => c.value === val);
                if (!newVal) return;
                setValue('country', newVal.label);
              }}
            />
          </FieldWrap>
          <FieldWrap>
            <Label>City</Label>
            <StyledSelectField
              isLoading={loadingCities}
              options={cityOptions || []}
              onChange={val => {
                if (!val) return;
                setValue('city', val);
              }}
            />
          </FieldWrap>
          <FieldWrap>
            <Label>Tags</Label>
            <StyledSelectField
              isSearchable
              options={notSelectedTags.map(t => ({ ...t, value: String(t.value) }))}
              onChange={val => {
                if (val) setValue('tag_ids', [...(tagsValue || []), +val]);
              }}
            />
          </FieldWrap>
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
          <LoadingButton loading={loading} variant="contained" type="submit">
            Create
          </LoadingButton>
        </Form>
      </Root>
    </Dialog>
  );
};

const Root = styled('div')(() => ({
  width: '838px',
  padding: '20px 25px',
}));

const Header = styled('header')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '40px',
}));

const Form = styled('form')(() => ({}));

const FieldWrap = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '24px',
}));

const Label = styled('div')(() => ({
  width: '184px',
  marginRight: '22px',
}));

const StyledTextField = styled(TextField)(() => ({
  '& textarea': { padding: 0 },
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
  width: 100%;
  & div {
    margin-bottom: 0;
  }
`;
