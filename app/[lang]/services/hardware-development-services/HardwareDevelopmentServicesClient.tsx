'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function HardwareDevelopmentServicesClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['hardware-development-services.title']}
      </Typography>
      <Typography variant="body1">
        {dict['hardware-development-services.description']}
      </Typography>
    </Box>
  );
}