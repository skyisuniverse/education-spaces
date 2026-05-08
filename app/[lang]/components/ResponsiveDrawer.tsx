"use client";

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Divider,
  IconButton,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Collapse,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useNavigation } from "@/app/[lang]/contexts/navigation-context";
import { adrsListMap } from "@/app/[lang]/config/adrs-lists";
import { ADRItem } from "../types/adr";
import Stack from "@mui/material/Stack";
import { StatusChip } from "./StatusChip";
import * as React from "react";

export const drawerWidth = 240;

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface Props {
  open: boolean;
  onDesktopDrawerClose: () => void;
  mobileOpen: boolean;
  onMobileDrawerClose: () => void;
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const {
    window,
    open,
    onDesktopDrawerClose,
    mobileOpen,
    onMobileDrawerClose,
  } = props;

  const pathname = usePathname();
  const { lang } = useParams() as { lang: string };

  const {
    selectedCategoryId,
    expandedAdrSlug,
    currentSlug,
    selectCategory,
    navigateToAdr,
    toggleExpanded,
    localizedCategories,
    decisionDict, // ← merged dict with status.* keys
  } = useNavigation();

  const selectedCategory =
    localizedCategories.find((cat) => cat.id === selectedCategoryId) ||
    localizedCategories[0];

  const getLocalizedHref = (href: string): string => {
    if (!href.startsWith("/")) href = "/" + href;
    if (href.startsWith(`/${lang}/`)) return href;
    return `/${lang}${href}`;
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    selectCategory(event.target.value as string);
  };

  const handleAdrHeaderClick = (slug: string) => {
    navigateToAdr(slug, true);
  };

  const handleToggle = (slug: string) => {
    toggleExpanded(slug);
  };

  const drawerContent = (onClose: () => void) => (
    <div>
      <DrawerHeader>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>

      <Divider />

      <Box sx={{ p: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="category-select-label">
            {/*Select Subject*/}
            {decisionDict["select.subject"] ?? "Select Subject"}
          </InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategoryId}
            label="Select Subject"
            onChange={handleCategoryChange}
          >
            {localizedCategories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider />

      <List>
        <ListSubheader component="div" id="nested-list-subheader">
          {selectedCategory.name}
        </ListSubheader>

        {selectedCategory.adrs.map((adrItem) => {
          const decisions: ADRItem[] = adrsListMap[adrItem.slug] || [];
          const isOpen = expandedAdrSlug === adrItem.slug;

          return (
            <React.Fragment key={adrItem.slug}>
              <ListItemButton
                selected={currentSlug === adrItem.slug}
                onClick={() => handleAdrHeaderClick(adrItem.slug)}
              >
                <ListItemText primary={adrItem.label} />
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(adrItem.slug);
                  }}
                >
                  {isOpen ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </ListItemButton>

              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {decisions.map((decision: ADRItem) => {
                    const localizedHref = getLocalizedHref(decision.link);

                    const translatedTitle =
                      decisionDict[decision.translationKey] ??
                      decision.translationKey; // Fallback to key if translation is missing

                    return (
                      <ListItemButton
                        key={decision.link}
                        component={Link}
                        href={localizedHref}
                        selected={pathname === localizedHref}
                        sx={{ pl: 4 }}
                      >
                        <Stack spacing={2} sx={{ width: "100%" }}>
                          <ListItemText
                            primary={translatedTitle}
                            secondary={decision.date}
                          />
                          <StatusChip
                            status={decision.status}
                            dict={decisionDict}
                          />
                        </Stack>
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="ADR navigation"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileDrawerClose}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        slotProps={{ root: { keepMounted: true } }}
      >
        {drawerContent(onMobileDrawerClose)}
      </Drawer>

      <Drawer
        variant="persistent"
        open={open}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent(onDesktopDrawerClose)}
      </Drawer>
    </Box>
  );
}
