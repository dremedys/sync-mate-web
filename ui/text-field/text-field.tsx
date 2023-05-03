import { FormLabel, TextField as MuiTextField, TextFieldProps, styled } from '@mui/material';
import { FC, forwardRef } from 'react';

type Props = TextFieldProps & { hasError: boolean };

export const TextField: FC<Props> = forwardRef((props, ref) => {
  return (
    <>
      <Label sx={{ color: props.hasError ? 'red' : 'initial' }}>{props.label}</Label>
      <MuiTextField ref={ref} {...props} label={undefined} />
    </>
  );
});

export const Label = styled(FormLabel)`
  display: block;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.3;
  color: #6d6e85;
  margin-bottom: 4px;

  & a {
    color: #007994;
    text-decoration: underline;
    margin-left: 18px;
  }

  & .MuiFormLabel-asterisk {
    color: #d6331f;
  }
`;
