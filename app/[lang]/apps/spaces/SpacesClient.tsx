'use client';

import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import localImage from '../../../../public/images/apps/spaces.jpg';

type Dictionary = Record<string, string>;

export default function SpacesClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['spaces.title']}
      </Typography>
      <Typography variant="body1">
        {dict['spaces.description']}
      </Typography>
      <br />
      <br />
      <Image src={localImage} alt="Spaces" sizes="100vw" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}