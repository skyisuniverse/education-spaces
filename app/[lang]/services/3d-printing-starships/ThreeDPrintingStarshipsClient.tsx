'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function ThreeDPrintingStarshipsClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['3d-printing-starships.title']}
      </Typography>
      <Typography variant="body1">
        {dict['3d-printing-starships.description']}
      </Typography>
    </Box>
  );
}