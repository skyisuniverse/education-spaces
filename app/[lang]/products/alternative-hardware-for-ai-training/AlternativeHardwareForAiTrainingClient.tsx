'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function AlternativeHardwareForAiTrainingClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['alternative-hardware-for-ai-training.title']}
      </Typography>
      <Typography variant="body1">
        {dict['alternative-hardware-for-ai-training.description']}
      </Typography>
    </Box>
  );
}