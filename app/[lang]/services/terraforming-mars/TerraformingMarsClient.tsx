'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function TerraformingMarsClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['terraforming-mars.title']}
      </Typography>
      <Typography variant="body1">
        {dict['terraforming-mars.description']}
      </Typography>
    </Box>
  );
}