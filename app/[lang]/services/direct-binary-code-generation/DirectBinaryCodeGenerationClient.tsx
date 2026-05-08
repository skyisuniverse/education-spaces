'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function DirectBinaryCodeGenerationClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['direct-binary-code-generation.title']}
      </Typography>
      <Typography variant="body1">
        {dict['direct-binary-code-generation.description']}
      </Typography>
    </Box>
  );
}