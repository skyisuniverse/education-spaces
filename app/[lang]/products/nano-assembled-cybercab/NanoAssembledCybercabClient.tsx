'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function NanoAssembledCybercabClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['nano-assembled-cybercab.title']}
      </Typography>
      <Typography variant="body1">
        {dict['nano-assembled-cybercab.description']}
      </Typography>
    </Box>
  );
}