'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function FusionPowerPlantClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['fusion-power-plant.title']}
      </Typography>
      <Typography variant="body1">
        {dict['fusion-power-plant.description']}
      </Typography>
    </Box>
  );
}