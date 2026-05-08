'use client';

import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import localImage from '../../../../public/images/apps/ticket-system.jpg';

type Dictionary = Record<string, string>;

export default function TicketSystemClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['ticket-system.title']}
      </Typography>
      <Typography variant="body1">
        {dict['ticket-system.description']}
      </Typography>
      <br />
      <br />
      <Image src={localImage} alt="Ticket System" sizes="100vw" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}