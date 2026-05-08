'use client';

import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import localImage from '../../../../public/images/apps/architecture-decision-records.jpg';

type Dictionary = Record<string, string>;

export default function ArchitectureDecisionRecordsClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['architecture-decision-records.title']}
      </Typography>
      <Typography variant="body1">
        {dict['architecture-decision-records.description']}
      </Typography>
      <br />
      <br />
      <Image src={localImage} alt="Architecture Decision Records" sizes="100vw" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}