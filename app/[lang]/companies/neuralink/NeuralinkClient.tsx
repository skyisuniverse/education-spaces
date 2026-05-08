'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function NeuralinkClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['neuralink.title']}
      </Typography>
      <Typography variant="body1">
        {dict['neuralink.description']}
      </Typography>
    </Box>
  );
}