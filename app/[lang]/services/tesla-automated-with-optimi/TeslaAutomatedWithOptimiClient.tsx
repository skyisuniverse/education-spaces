'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function TeslaAutomatedWithOptimiClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['tesla-automated-with-optimi.title']}
      </Typography>
      <Typography variant="body1">
        {dict['tesla-automated-with-optimi.description']}
      </Typography>
    </Box>
  );
}