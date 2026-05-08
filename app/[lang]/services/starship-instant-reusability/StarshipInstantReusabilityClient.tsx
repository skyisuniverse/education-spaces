'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function StarshipInstantReusabilityClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['starship-instant-reusability.title']}
      </Typography>
      <Typography variant="body1">
        {dict['starship-instant-reusability.description']}
      </Typography>
    </Box>
  );
}