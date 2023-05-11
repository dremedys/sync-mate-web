import { Typography, styled } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

type Props = {
  description: string;
  date: string;
  imgSrc: string;
  width: number;
  height: number;
};

export const FeedItem: FC<Props> = ({ description, imgSrc, date, width, height }) => {
  return (
    <Root>
      <Typography textAlign="right" variant="body1" sx={{ color: 'gray' }}>
        {date}
      </Typography>
      <Typography variant="h6" mb="24px" dangerouslySetInnerHTML={{ __html: description }}></Typography>
      <Image quality={100} layout="responsive" src={imgSrc} width={width} height={height} />
    </Root>
  );
};

const Root = styled('div')(() => ({
  padding: '20px 28px',
  background: '#FAF9F6',
  borderRadius: '8px',
  marginBottom: '38px',
}));
