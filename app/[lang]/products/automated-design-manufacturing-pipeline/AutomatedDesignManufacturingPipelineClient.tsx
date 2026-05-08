'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function AutomatedDesignManufacturingPipelineClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['automated-design-manufacturing-pipeline.title']}
      </Typography>
      <Typography variant="body1">
        {dict['automated-design-manufacturing-pipeline.description']}
      </Typography>
    </Box>
  );
}