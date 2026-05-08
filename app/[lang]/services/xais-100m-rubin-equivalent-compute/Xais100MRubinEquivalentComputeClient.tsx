'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function Xais100MRubinEquivalentComputeClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['xais-100m-rubin-equivalent-compute.title']}
      </Typography>
      <Typography variant="body1">
        {dict['xais-100m-rubin-equivalent-compute.description']}
      </Typography>
    </Box>
  );
}