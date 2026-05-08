'use client';

import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import localImage from '../../../../public/images/apps/dating-spaces.jpg';

type Dictionary = Record<string, string>;

export default function DatingSpacesClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['dating-spaces.title']}
      </Typography>
      <Typography variant="body1">
        {dict['dating-spaces.description']}
      </Typography>
      <br />
      <br />
      <Image src={localImage} alt="Dating Spaces" sizes="100vw" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}