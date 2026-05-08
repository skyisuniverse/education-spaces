"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ADRItem } from "@/app/[lang]/types/adr";
import { StatusChip } from "./StatusChip";
import { useParams } from "next/navigation";

const ADRCard = ({
  titleKey,
  date,
  status,
  link,
  dict,
}: {
  titleKey: string;
  date: string;
  status: string;
  link: string;
  dict: Record<string, string>;
}) => {
  const { lang } = useParams() as { lang: string };

  // Make the link locale-aware (same pattern used everywhere else)
  const getLocalizedHref = (href: string): string => {
    if (!href.startsWith("/")) href = "/" + href;
    if (href.startsWith(`/${lang}/`)) return href;
    return `/${lang}${href}`;
  };

  const localizedLink = getLocalizedHref(link);

  const translatedTitle = dict[titleKey] ?? titleKey; // ← use the key to get the translated title

  return (
    <Link
      href={localizedLink} // ← now always includes /de/ or /en/
      style={{ textDecoration: "none", display: "block", height: "100%" }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: 8,
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            {translatedTitle}
          </Typography>
        </CardContent>

        <Box
          sx={{
            px: 3,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: 500, color: "text.secondary" }}
          >
            {date}
          </Typography>

          <StatusChip status={status} dict={dict} />
        </Box>
      </Card>
    </Link>
  );
};

export function ADRCategoryPage({
  title,
  publishedDate,
  description,
  imageSrc,
  adrsList,
  dict = {},
  children,
}: {
  title: string;
  publishedDate: string;
  description: ReactNode;
  imageSrc?: string | StaticImport;
  adrsList: ADRItem[];
  dict?: Record<string, string>;
  children?: ReactNode;
}) {
  const defaultImageSrc = imageSrc || "/images/adr-placeholder.png";

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 4, md: 5 },
        px: { xs: 2, md: 4 },
        pb: { xs: 12, md: 5 },
      }}
    >
      {/* Hero Section */}
      <Grid
        container
        spacing={{ xs: 6, md: 5 }}
        alignItems="flex-start"
        sx={{ mb: { xs: 4, md: 5 } }}
      >
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: { xs: "16 / 9", md: "4 / 3" },
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 6,
            }}
          >
            <Image
              src={defaultImageSrc}
              alt={title}
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2.25rem", md: "2.75rem" },
                mb: 1,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mb: { xs: 2, md: 3 }, fontWeight: 500 }}
            >
              {publishedDate}
            </Typography>

            {description}
          </Box>
        </Grid>
      </Grid>

      {children}

      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 4,
          fontWeight: 700,
          textAlign: "left",
        }}
      >
        {dict["category.lessons"] ?? "Lessons"}
      </Typography>

      <Grid container spacing={{ xs: 3, md: 4 }}>
        {adrsList.map((adr: ADRItem) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={adr.link}>
            <ADRCard
              titleKey={adr.translationKey}
              date={adr.date}
              status={adr.status}
              link={adr.link}
              dict={dict}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
