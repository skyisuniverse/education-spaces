'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function InstantlyReusableLaunchpadClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['instantly-reusable-launchpad.title']}
      </Typography>
      <Typography variant="body1">
        {dict['instantly-reusable-launchpad.description']}
      </Typography>
    </Box>
  );
}