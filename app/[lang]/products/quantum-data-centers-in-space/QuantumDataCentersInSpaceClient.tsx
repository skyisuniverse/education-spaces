'use client';

import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import localImage from '../../../../public/images/products/full-size/quantum-data-centers-in-space.jpg';

type Dictionary = Record<string, string>;

export default function QuantumDataCentersInSpaceClient({ dict }: { dict: Dictionary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dict['quantum-data-centers-in-space.title']}
      </Typography>
      <Typography variant="body1">
        {dict['quantum-data-centers-in-space.description']}
      </Typography>
      <br />
      <Image src={localImage} alt="Quantum Data Centers in Space" sizes="100vw" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}