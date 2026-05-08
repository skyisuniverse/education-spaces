'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function AirSeparationClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['air-separation.title']}
      </Typography>
      <Typography variant="body1">
        {dict['air-separation.description']}
      </Typography>
    </Box>
  );
}