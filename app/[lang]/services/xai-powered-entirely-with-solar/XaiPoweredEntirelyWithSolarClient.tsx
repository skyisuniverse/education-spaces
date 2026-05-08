'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function XaiPoweredEntirelyWithSolarClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['xai-powered-entirely-with-solar.title']}
      </Typography>
      <Typography variant="body1">
        {dict['xai-powered-entirely-with-solar.description']}
      </Typography>
    </Box>
  );
}