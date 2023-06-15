import { toast } from '@/components/toast/toast';
import { getCities, getCountries } from '@/services/geoname';
import { getTags } from '@/services/tag';
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
  refetch: () => void;
};

export const TeamModal: FC<Props> = ({ team, onClose, isOpen, refetch }) => {
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
      const { data } = await getTags();
      setTags(data.map(item => ({ label: item.name_en, value: item.id })));
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
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOKV3x9jHs9oRN3dSvA8C9kD9n83JCCEUWKw&usqp=CAU',
        // 'https://qbdgroup.com/wp-content/uploads/Artificial-Intelligence-in-Medical-Devices-what-do-we-know-so-far.jpg',
        // avatar:
        // 'data:image/png;base64,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',
        // avatar: 'https://assets.rbl.ms/33302768/origin.jpg',
      });
      refetch();
      toast.success('Team is successfully created! Start exploring people!');
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
          <Typography variant="headlineLarge">Create a team</Typography>
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
          <LoadingButton loading={loading} variant="contained" type="submit" sx={{ marginLeft: 'auto' }}>
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

const Label = styled('div')(({ theme }) => ({
  ...theme.typography.titleSmall,
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
