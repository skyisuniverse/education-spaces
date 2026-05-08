'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function SmartStarbaseClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['smart-starbase.title']}
      </Typography>
      <Typography variant="body1">
        {dict['smart-starbase.description']}
      </Typography>
    </Box>
  );
}