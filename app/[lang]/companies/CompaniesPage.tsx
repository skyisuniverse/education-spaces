'use client';

import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
  Container,
} from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type Dictionary = Record<string, string>;

const companies = [
  { title: 'SpaceX', href: '/companies/spacex', img: '/images/companies/Flight_3_Lift_Of.jpg' },
  { title: 'Tesla', href: '/companies/tesla', img: '/images/companies/14.jpg' },
  { title: 'xAI', href: '/companies/xai', img: '/images/companies/1.jpg' },
  { title: 'NeuraLink', href: '/companies/neuralink', img: '/images/companies/2.jpg' },
];

export default function CompaniesPage({ dict }: { dict: Dictionary }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { lang } = useParams() as { lang: string };

  const getLocalizedHref = (href: string): string => {
    if (!href.startsWith('/')) href = '/' + href;
    if (href.startsWith(`/${lang}/`)) return href;
    return `/${lang}${href}`;
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 6, md: 0 },
      }}
    >
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 100,
            textAlign: "center",
            mb: 1,
          }}
        >
          {dict.companies}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "center", maxWidth: 600, mx: "auto" }}
        >
          {dict['companies.subtitle']}
        </Typography>
      </Box>

        <ImageList sx={{ width: '100%', mb: 0.7 }} cols={1} rowHeight={isMobile ? 220 : 340}>
          <ImageListItem component={Link} href={getLocalizedHref(companies[0].href)}>
            <img
              src={companies[0].img}
              alt={companies[0].title}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
            <ImageListItemBar title={companies[0].title} position="bottom" />
          </ImageListItem>
        </ImageList>

        <ImageList sx={{ width: '100%' }} cols={isMobile ? 1 : 3} rowHeight={isMobile ? 180 : 220}>
          {companies.slice(1).map((item) => (
            <ImageListItem key={item.title} component={Link} href={getLocalizedHref(item.href)}>
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
              <ImageListItemBar title={item.title} position="bottom" />
            </ImageListItem>
          ))}
        </ImageList>
    </Container>
  );
}