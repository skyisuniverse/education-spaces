'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function FasterFactoriesClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['faster-factories.title']}
      </Typography>
      <Typography variant="body1">
        {dict['faster-factories.description']}
      </Typography>
    </Box>
  );
}