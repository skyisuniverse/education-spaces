'use client';

import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import localImage from '../../../../public/images/services/full-size/satellite-operation-services.jpg';

type Dictionary = Record<string, string>;

export default function SatelliteOperationServicesClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['satellite-operation-services.title']}
      </Typography>
      <Typography variant="body1">
        {dict['satellite-operation-services.description']}
      </Typography>
      <br />
      <Image src={localImage} alt="Satellite Operation Services" sizes="100vw" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}