'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function TrainingAIModelsInMinutesClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['training-ai-models-in-minutes.title']}
      </Typography>
      <Typography variant="body1">
        {dict['training-ai-models-in-minutes.description']}
      </Typography>
    </Box>
  );
}