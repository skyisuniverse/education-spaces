'use client';

import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import localImage from '../../../../public/images/services/full-size/space-launching-services.jpg';

type Dictionary = Record<string, string>;

export default function SpaceLaunchingServicesClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['space-launching-services.title']}
      </Typography>
      <Typography variant="body1">
        {dict['space-launching-services.description']}
      </Typography>
      <br />
      <Image src={localImage} alt="Space Launching Services" sizes="100vw" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}