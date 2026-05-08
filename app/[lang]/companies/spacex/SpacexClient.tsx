'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function SpacexClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['spacex.title']}
      </Typography>
      <Typography variant="body1">
        {dict['spacex.description']}
      </Typography>
    </Box>
  );
}