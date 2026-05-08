'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function PerspectiveNeuralinkBCIsClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['perspective-neuralink-bcis.title']}
      </Typography>
      <Typography variant="body1">
        {dict['perspective-neuralink-bcis.description']}
      </Typography>
    </Box>
  );
}