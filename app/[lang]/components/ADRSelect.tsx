"use client";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  type SelectChangeEvent,
} from "@mui/material";
import { useNavigation } from "@/app/[lang]/contexts/navigation-context";
import React from "react";

export default function ADRSelect() {
  const { currentSlug, navigateToAdr, localizedCategories } = useNavigation();

  const handleChange = (event: SelectChangeEvent) => {
    navigateToAdr(event.target.value as string, false);
  };

  return (
    <FormControl fullWidth>
      <InputLabel
        id="demo-simple-select-label"
        sx={{
          color: "white",
          "&.Mui-focused": { color: "white" },
        }}
      >
        Select ADR
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentSlug}
        label="Select ADR"
        onChange={handleChange}
        sx={{
          color: "white",
          ".MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          ".MuiSvgIcon-root ": { fill: "white !important" },
        }}
      >
        {localizedCategories.map((category) => (
          <React.Fragment key={category.id}>
            <ListSubheader>{category.name}</ListSubheader>
            {category.adrs.map((adr) => (
              <MenuItem key={adr.slug} value={adr.slug}>
                {adr.label}
              </MenuItem>
            ))}
          </React.Fragment>
        ))}
      </Select>
    </FormControl>
  );
}
