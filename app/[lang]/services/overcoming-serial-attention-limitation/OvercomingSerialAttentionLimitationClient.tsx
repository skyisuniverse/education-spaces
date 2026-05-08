'use client';

import { Typography, Box } from '@mui/material';

type Dictionary = Record<string, string>;

export default function OvercomingSerialAttentionLimitationClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['overcoming-serial-attention-limitation.title']}
      </Typography>
      <Typography variant="body1">
        {dict['overcoming-serial-attention-limitation.description']}
      </Typography>
    </Box>
  );
}