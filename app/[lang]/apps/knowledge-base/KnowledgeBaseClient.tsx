'use client';

import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import localImage from '../../../../public/images/apps/knowledge-base.jpg';

type Dictionary = Record<string, string>;

export default function KnowledgeBaseClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['knowledge-base.title']}
      </Typography>
      <Typography variant="body1">
        {dict['knowledge-base.description']}
      </Typography>
      <br />
      <br />
      <Image src={localImage} alt="Knowledge base" sizes="100vw" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}