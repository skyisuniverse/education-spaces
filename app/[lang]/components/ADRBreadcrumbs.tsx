"use client";

import { Breadcrumbs, Typography, Link as MuiLink } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import {
  useNavigation,
  type ListItem,
} from "@/app/[lang]/contexts/navigation-context";

type Dictionary = Record<string, string>;

export default function ADRBreadcrumbs({ dict }: { dict: Dictionary }) {
  const pathname = usePathname();
  const { lang } = useParams() as { lang: string };

  const {
    activeCategory,
    currentAdr,
    currentSlug,
    currentAdrCategoryName,
    currentProduct,
    currentCompany,
    currentService,
    currentApp,
    decisionDict,
  } = useNavigation();

  const getLocalizedHref = (href: string): string => {
    if (href === "/") return `/${lang}`;
    if (!href.startsWith("/")) href = "/" + href;
    if (href.startsWith(`/${lang}/`)) return href;
    return `/${lang}${href}`;
  };

  const breadcrumbItems: React.ReactNode[] = [
    <MuiLink
      key="home"
      component={Link}
      href={getLocalizedHref("/")}
      underline="hover"
      color="inherit"
    >
      {decisionDict.subjects}
    </MuiLink>,
  ];

  type Section = {
    prefix: string;
    listHref: string;
    listTitle: string;
    currentItem: ListItem | undefined;
    itemKey: string;
  };

  const sections: Section[] = [
    {
      prefix: "/companies",
      listHref: "/companies",
      listTitle: dict.companies,
      currentItem: currentCompany,
      itemKey: "company",
    },
    {
      prefix: "/services",
      listHref: "/services",
      listTitle: dict.services,
      currentItem: currentService,
      itemKey: "service",
    },
    {
      prefix: "/products",
      listHref: "/products",
      listTitle: dict.products,
      currentItem: currentProduct,
      itemKey: "product",
    },
    {
      prefix: "/apps",
      listHref: "/apps",
      listTitle: dict.applications,
      currentItem: currentApp,
      itemKey: "app",
    },
    {
      prefix: "/glossary",
      listHref: "/glossary",
      listTitle: dict.glossary ?? "Glossary",
      currentItem: undefined, // Glossary is a single static page (no detail view yet)
      itemKey: "glossary",
    },
  ];

  const getSectionBreadcrumbs = (): React.ReactNode[] => {
    const section = sections.find((s) =>
      pathname.startsWith(getLocalizedHref(s.prefix)),
    );
    if (!section) return [];

    const { listHref, listTitle, currentItem, itemKey } = section;
    const localizedListHref = getLocalizedHref(listHref);
    const isDetailPage = pathname !== localizedListHref && !!currentItem;

    if (isDetailPage && currentItem) {
      return [
        <MuiLink
          key={`${itemKey}-list`}
          component={Link}
          href={localizedListHref}
          underline="hover"
          color="inherit"
        >
          {listTitle}
        </MuiLink>,
        <Typography key={`${itemKey}-item`} color="text.primary">
          {currentItem.title}
        </Typography>,
      ];
    }

    return [
      <Typography key={itemKey} color="text.primary">
        {listTitle}
      </Typography>,
    ];
  };

  breadcrumbItems.push(...getSectionBreadcrumbs());

  const isNonADRSection = sections.some((s) =>
    pathname.startsWith(getLocalizedHref(s.prefix)),
  );

  if (!isNonADRSection && activeCategory) {
    breadcrumbItems.push(
      <Typography key="adr-group" color="text.primary">
        {dict[activeCategory.name] ?? activeCategory.name}
      </Typography>,
    );

    if (currentSlug && currentAdrCategoryName) {
      const categoryHref = `/adrs/${currentSlug}`;
      const localizedCategoryHref = getLocalizedHref(categoryHref);

      if (currentAdr) {
        breadcrumbItems.push(
          <MuiLink
            key="category"
            component={Link}
            href={localizedCategoryHref}
            underline="hover"
            color="inherit"
          >
            {currentAdrCategoryName}
          </MuiLink>,
        );
        breadcrumbItems.push(
          <Typography key="decision" color="text.primary">
            {decisionDict[currentAdr.translationKey] ??
              currentAdr.translationKey}
          </Typography>,
        );
      } else {
        breadcrumbItems.push(
          <Typography key="category" color="text.primary">
            {currentAdrCategoryName}
          </Typography>,
        );
      }
    }
  }

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mb: 4 }}
    >
      {breadcrumbItems}
    </Breadcrumbs>
  );
}
