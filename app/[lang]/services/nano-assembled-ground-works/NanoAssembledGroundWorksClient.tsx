'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function NanoAssembledGroundWorksClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['nano-assembled-ground-works.title']}
      </Typography>
      <Typography variant="body1">
        {dict['nano-assembled-ground-works.description']}
      </Typography>
    </Box>
  );
}