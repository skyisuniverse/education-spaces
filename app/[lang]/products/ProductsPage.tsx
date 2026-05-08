'use client';

import Image from "next/image";
import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { itemData } from "./products-list";
import { AdrImage } from "../components/ADRImage";

type Dictionary = Record<string, string>;

export default function ProductsPage({ dict }: { dict: Dictionary }) {
  const theme = useTheme();
  const { lang } = useParams() as { lang: string };

  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const cols = isXl ? 6 : isLg ? 5 : isMd ? 4 : 3;

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
        px: { xs: 2, sm: 4, md: 0 },
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
          {dict.products}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "center", maxWidth: 600, mx: "auto" }}
        >
          {dict['products.subtitle']}
        </Typography>
      </Box>

      <ImageList
        variant="masonry"
        cols={cols}
        gap={16}
        sx={{
          width: "100%",
          "& .MuiImageListItem-root": {
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          },
        }}
      >
        {itemData.map((item) => {
          const imageSrc = `/images/products/${item.slug}.jpg`;
          const localizedHref = getLocalizedHref(`/products/${item.slug}`);

          return (
            <ImageListItem
              key={item.slug}
              sx={{
                "& img": {
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                },
                "&:hover img": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Link
                href={localizedHref}
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <AdrImage
                  src={imageSrc}
                  alt={item.title}
                  width={item.width}
                  height={item.height}
                />
              </Link>
            </ImageListItem>
          );
        })}
      </ImageList>
    </Container>
  );
}