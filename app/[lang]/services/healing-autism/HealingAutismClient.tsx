'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function HealingAutismClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['healing-autism.title']}
      </Typography>
      <Typography variant="body1">
        {dict['healing-autism.description']}
      </Typography>
    </Box>
  );
}