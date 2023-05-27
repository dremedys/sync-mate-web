import { GetTeamResponseDto } from '@/types/team';
import { CardItem } from '@/ui/card-item/card-item';
import { styled } from '@mui/material';
import { FC } from 'react';

type Props = {
  team: GetTeamResponseDto;
};
export const MyTeamCard: FC<Props> = ({ team }) => {
  return <CardItem>lol</CardItem>;
};

const Top = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
}));
