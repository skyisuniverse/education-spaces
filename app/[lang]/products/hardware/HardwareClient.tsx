'use client';

import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import localImage from '../../../../public/images/products/full-size/hardware.jpg';

type Dictionary = Record<string, string>;

export default function HardwareClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['hardware.title']}
      </Typography>
      <Typography variant="body1">
        {dict['hardware.description']}
      </Typography>
      <br />
      <Image src={localImage} alt="Hardware" sizes="100vw" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}