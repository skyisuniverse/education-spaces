'use client';

import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import localImage from '../../../../public/images/apps/extended-spaces.jpg';

type Dictionary = Record<string, string>;

export default function ExtendedSpacesClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['extended-spaces.title']}
      </Typography>
      <Typography variant="body1">
        {dict['extended-spaces.description']}
      </Typography>
      <br />
      <br />
      <Image src={localImage} alt="Extended Spaces" sizes="100vw" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}