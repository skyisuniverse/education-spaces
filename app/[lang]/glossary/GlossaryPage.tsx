'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Stack,
  Paper,
  Typography,
  Grid,
  alpha,
  Divider,
  Container,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface GlossaryItem {
  term: string;
  definition: string;
}

interface Props {
  dict: Record<string, string>;
}

export default function GlossaryPage({ dict }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  // Fully translated glossary data
  const glossaryData: GlossaryItem[] = [
    {
      term: dict['glossary.term.ADR'],
      definition: dict['glossary.definition.ADR'],
    },
    {
      term: dict['glossary.term.nanoassembler'],
      definition: dict['glossary.definition.nanoassembler'],
    },
    {
      term: dict['glossary.term.starship'],
      definition: dict['glossary.definition.starship'],
    },
    {
      term: dict['glossary.term.optimus'],
      definition: dict['glossary.definition.optimus'],
    },
    {
      term: dict['glossary.term.neuralink'],
      definition: dict['glossary.definition.neuralink'],
    },
    {
      term: dict['glossary.term.fusion'],
      definition: dict['glossary.definition.fusion'],
    },
    {
      term: dict['glossary.term.terraforming'],
      definition: dict['glossary.definition.terraforming'],
    },
  ];

  // Group by first letter + filter
  const grouped = useMemo(() => {
    const filtered = glossaryData.filter((item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.reduce((acc: Record<string, GlossaryItem[]>, item) => {
      const letter = item.term[0].toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(item);
      return acc;
    }, {});
  }, [glossaryData, searchTerm]);

  const letters = Object.keys(grouped).sort();

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        px: { xs: 2, sm: 4, md: 0 },
        py: { xs: 6, md: 0 },
      }}
    >
      {/* HERO */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 100,
            textAlign: 'center',
            mb: 1,
          }}
        >
          {dict.glossary}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}
        >
          {dict['glossary.subtitle']}
        </Typography>
      </Box>

      {/* SEARCH + A-Z NAV */}
      <Box sx={{ mb: 6 }}>
        <TextField
          fullWidth
          placeholder={dict['glossary.searchPlaceholder']}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            maxWidth: 480,
            mx: 'auto',
            display: 'block',
            '& .MuiOutlinedInput-root': {
              borderRadius: 6,
              bgcolor: (theme) => alpha(theme.palette.background.paper, 0.6),
            },
          }}
        />

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          justifyContent="center"
          sx={{ mt: 4 }}
        >
          {letters.map((letter) => (
            <Button
              key={letter}
              variant="outlined"
              size="small"
              onClick={() => scrollToLetter(letter)}
              sx={{
                minWidth: 42,
                borderRadius: 4,
                fontWeight: 600,
                '&:hover': { bgcolor: 'primary.main', color: 'white' },
              }}
            >
              {letter}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* CONTENT */}
      {letters.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ py: 8, opacity: 0.6 }}>
          {dict['glossary.noTermsFound']}
        </Typography>
      ) : (
        letters.map((letter) => (
          <Box key={letter} sx={{ mb: 8 }}>
            {/* Letter Header */}
            <Typography
              id={`letter-${letter}`}
              variant="h2"
              sx={{
                fontSize: '4rem',
                fontWeight: 100,
                lineHeight: 1,
                mb: 3,
                color: 'primary.main',
                opacity: 0.15,
                position: 'relative',
                scrollMarginTop: '100px',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 8,
                  left: 0,
                  width: '100%',
                  height: 2,
                  bgcolor: 'primary.main',
                  opacity: 0.15,
                },
              }}
            >
              {letter}
            </Typography>

            {/* Terms Grid */}
            <Grid container spacing={3}>
              {grouped[letter].map((item) => (
                <Grid key={item.term} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3.5,
                      height: '100%',
                      borderRadius: 5,
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: (theme) => theme.shadows[10],
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ fontWeight: 500, mb: 1.5, letterSpacing: '-0.01em' }}
                    >
                      {item.term}
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    <Typography
                      variant="body1"
                      sx={{ lineHeight: 1.7, color: 'text.secondary' }}
                    >
                      {item.definition}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}

      {/* FOOTER NOTE */}
      <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', opacity: 0.6, mt: 8 }}>
        {dict['glossary.lastUpdated']}
      </Typography>
    </Container>
  );
}