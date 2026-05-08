'use client';

import { styled } from '@mui/material/styles';
import { drawerWidth } from './ResponsiveDrawer';

export const StyledMain = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  // Responsive bottom padding to fix overlap with bottom nav on mobile
  paddingBottom: theme.spacing(2),           // default

  [theme.breakpoints.down('sm')]: {          // Only on mobile (xs)
    paddingBottom: '70px',                   // Adjust this value based on your bottom nav height
  },
  marginLeft: 0,

  [theme.breakpoints.up('sm')]: {
    marginLeft: `-${drawerWidth}px`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  variants: [
    {
      props: ({ open }) => open,
      style: {
        [theme.breakpoints.up('sm')]: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    },
  ],
}));