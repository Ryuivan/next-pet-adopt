"use client";

import { createTheme, PaletteMode } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { getDesignTokens } from "@/utils/mui/theme";

const useColorTheme = () => {
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMode = localStorage.getItem("themeMode") as PaletteMode;
      if (storedMode) {
        setMode(storedMode);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("themeMode", mode);
    }
  }, [mode]);

  const toggleColorMode = (newMode: PaletteMode) => {
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const modifiedTheme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};

export default useColorTheme;
