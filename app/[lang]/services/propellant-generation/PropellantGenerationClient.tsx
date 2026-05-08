'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function PropellantGenerationClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['propellant-generation.title']}
      </Typography>
      <Typography variant="body1">
        {dict['propellant-generation.description']}
      </Typography>
    </Box>
  );
}