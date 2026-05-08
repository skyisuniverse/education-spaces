'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function NanoAssembledOptimusClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['nano-assembled-optimus.title']}
      </Typography>
      <Typography variant="body1">
        {dict['nano-assembled-optimus.description']}
      </Typography>
    </Box>
  );
}