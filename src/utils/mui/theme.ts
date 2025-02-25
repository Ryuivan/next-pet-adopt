"use client";

import { PaletteMode, } from "@mui/material";
import { Plus_Jakarta_Sans } from "next/font/google";
import { grey } from "@mui/material/colors";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#9088E4",
          },
          background: {
            default: "#F7F7F7",
            primary: grey[300],
            paper: grey[50],
          },
          text: {
            primary: "#252627",
            secondary: "#9088E4",
          },
        }
      : {
          // palette values for dark mode
          primary: grey,
          background: {
            default: "#121212",
            paper: grey[900],
          },
          text: {
            primary: "#f1f1f1",
            secondary: grey[300],
          },
        }),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
  typography: {
    fontFamily: plusJakartaSans.style.fontFamily,
  },
});
