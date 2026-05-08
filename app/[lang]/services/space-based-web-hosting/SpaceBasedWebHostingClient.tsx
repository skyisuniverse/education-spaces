'use client';

import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import localImage from '../../../../public/images/services/full-size/space-based-web-hosting.jpg';

type Dictionary = Record<string, string>;

export default function SpaceBasedWebHostingClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['space-based-web-hosting.title']}
      </Typography>
      <Typography variant="body1">
        {dict['space-based-web-hosting.description']}
      </Typography>
      <br />
      <Image src={localImage} alt="Space-based Web Hosting" sizes="100vw" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}