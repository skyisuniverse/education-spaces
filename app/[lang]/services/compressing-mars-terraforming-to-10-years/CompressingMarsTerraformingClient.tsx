'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function CompressingMarsTerraformingClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['compressing-mars-terraforming.title']}
      </Typography>
      <Typography variant="body1">
        {dict['compressing-mars-terraforming.description']}
      </Typography>
    </Box>
  );
}