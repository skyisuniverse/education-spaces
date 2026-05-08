'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function EngineeringSimulationToolClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['engineering-simulation-tool.title']}
      </Typography>
      <Typography variant="body1">
        {dict['engineering-simulation-tool.description']}
      </Typography>
    </Box>
  );
}