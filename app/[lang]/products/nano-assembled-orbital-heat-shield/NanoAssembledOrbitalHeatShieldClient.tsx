'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function NanoAssembledOrbitalHeatShieldClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['nano-assembled-orbital-heat-shield.title']}
      </Typography>
      <Typography variant="body1">
        {dict['nano-assembled-orbital-heat-shield.description']}
      </Typography>
    </Box>
  );
}