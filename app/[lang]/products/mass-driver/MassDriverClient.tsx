'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function MassDriverClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['mass-driver.title']}
      </Typography>
      <Typography variant="body1">
        {dict['mass-driver.description']}
      </Typography>
    </Box>
  );
}