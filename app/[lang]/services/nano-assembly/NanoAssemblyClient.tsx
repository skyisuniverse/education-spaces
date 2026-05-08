'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function NanoAssemblyClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['nano-assembly.title']}
      </Typography>
      <Typography variant="body1">
        {dict['nano-assembly.description']}
      </Typography>
    </Box>
  );
}