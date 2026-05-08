'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function NanoassemblyBoostedSpacexClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['nanoassembly-boosted-spacex.title']}
      </Typography>
      <Typography variant="body1">
        {dict['nanoassembly-boosted-spacex.description']}
      </Typography>
    </Box>
  );
}