'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function SolarSystemHabitationClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['solar-system-habitation.title']}
      </Typography>
      <Typography variant="body1">
        {dict['solar-system-habitation.description']}
      </Typography>
    </Box>
  );
}