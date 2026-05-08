'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function FusionStarshipClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['fusion-starship.title']}
      </Typography>
      <Typography variant="body1">
        {dict['fusion-starship.description']}
      </Typography>
    </Box>
  );
}