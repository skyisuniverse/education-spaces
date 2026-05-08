'use client';

import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import localImage from '../../../../public/images/services/full-size/space-based-web-development-platform.jpg';

type Dictionary = Record<string, string>;

export default function SpaceBasedWebDevelopmentPlatformClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['space-based-web-development-platform.title']}
      </Typography>
      <Typography variant="body1">
        {dict['space-based-web-development-platform.description']}
      </Typography>
      <br />
      <Image src={localImage} alt="Space-based Web Development Platform" sizes="100vw" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}