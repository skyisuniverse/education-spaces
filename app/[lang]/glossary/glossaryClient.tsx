// app/[lang]/glossary/glossaryClient.tsx
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface GlossaryItem {
  term: string;
  definition: string;
}

export default function GlossaryClient({ glossaryData }: { glossaryData: GlossaryItem[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Group by first letter (filtered by search)
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

  // Smooth scroll directly to the big letter header
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
    <>
      {/* SEARCH + A-Z NAV */}
      <Box sx={{ mb: 6 }}>
        <TextField
          fullWidth
          placeholder="Search terms or definitions..."
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

        {/* A-Z PILLS */}
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
          No terms found
        </Typography>
      ) : (
        letters.map((letter) => (
          <Box key={letter} sx={{ mb: 8 }}>
            {/* Letter Header – EXACT scroll target */}
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
                scrollMarginTop: '100px',           // ← Adjust this value if your navbar is taller/shorter
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
                      sx={{
                        fontWeight: 500,
                        mb: 1.5,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.term}
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.7,
                        color: 'text.secondary',
                      }}
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
    </>
  );
}