'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function StarshipNanoAssemblyClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['starship-nano-assembly.title']}
      </Typography>
      <Typography variant="body1">
        {dict['starship-nano-assembly.description']}
      </Typography>
    </Box>
  );
}