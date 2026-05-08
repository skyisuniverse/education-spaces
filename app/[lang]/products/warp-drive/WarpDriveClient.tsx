'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function WarpDriveClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['warp-drive.title']}
      </Typography>
      <Typography variant="body1">
        {dict['warp-drive.description']}
      </Typography>
    </Box>
  );
}