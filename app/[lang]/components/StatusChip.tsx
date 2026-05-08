'use client';

import { Chip, ChipProps } from '@mui/material';
import React from 'react';
import type { AdrStatus } from '@/app/[lang]/types/adr';

interface StatusChipProps extends Omit<ChipProps, 'color' | 'label'> {
  status: AdrStatus | string;
  dict?: Record<string, string>;   // ← translation support (root or colocated dictionary)
  label?: string;
}

const getStatusColor = (status: string): ChipProps['color'] => {
  const colorMap: Record<string, ChipProps['color']> = {
    Draft: 'default',
    Proposed: 'info',
    Rejected: 'error',
    Accepted: 'success',
    Deprecated: 'warning',
    Superseded: 'secondary',
  };
  return colorMap[status] ?? 'default';
};

export const StatusChip: React.FC<StatusChipProps> = ({
  status,
  label,
  dict,
  variant = 'filled',
  ...chipProps
}) => {
  // Use translation from dictionary (no fallback as requested)
  const translatedLabel = dict?.[`status.${status.toLowerCase()}`] ?? label ?? status;

  return (
    <Chip
      label={translatedLabel}
      color={getStatusColor(status)}
      variant={variant}
      {...chipProps}
    />
  );
};