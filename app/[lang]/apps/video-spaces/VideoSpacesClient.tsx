'use client';

import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import localImage from '../../../../public/images/apps/video-spaces.jpg';

type Dictionary = Record<string, string>;

export default function VideoSpacesClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['video-spaces.title']}
      </Typography>
      <Typography variant="body1">
        {dict['video-spaces.description']}
      </Typography>
      <br />
      <br />
      <Image src={localImage} alt="Video Spaces" sizes="100vw" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}