'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function NeuromorphicComputingClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['neuromorphic-computing.title']}
      </Typography>
      <Typography variant="body1">
        {dict['neuromorphic-computing.description']}
      </Typography>
    </Box>
  );
}