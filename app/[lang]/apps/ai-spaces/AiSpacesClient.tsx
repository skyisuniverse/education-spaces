'use client';

import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import localImage from '../../../../public/images/apps/ai-spaces.jpg';

type Dictionary = Record<string, string>;

export default function AiSpacesClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['ai-spaces.title']}
      </Typography>
      <Typography variant="body1">
        {dict['ai-spaces.description']}
      </Typography>
      <br />
      <br />
      <Image
        src={localImage}
        alt="Full width image"
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </Box>
  );
}