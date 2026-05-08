'use client';

import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import localImage from '../../../../public/images/apps/freelance-spaces.jpg';

type Dictionary = Record<string, string>;

export default function FreelanceSpacesClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['freelance-spaces.title']}
      </Typography>
      <Typography variant="body1">
        {dict['freelance-spaces.description']}
      </Typography>
      <br />
      <br />
      <Image src={localImage} alt="Freelance Spaces" sizes="100vw" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}