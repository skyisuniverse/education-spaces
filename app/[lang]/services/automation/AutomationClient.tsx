'use client';

import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import localImage from '../../../../public/images/services/full-size/automation.jpg';

type Dictionary = Record<string, string>;

export default function AutomationClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['automation.title']}
      </Typography>
      <Typography variant="body1">
        {dict['automation.description']}
      </Typography>
      <br />
      <Image
        src={localImage}
        alt="Automation"
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
    </Box>
  );
}