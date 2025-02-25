"use client";

import { createTheme, PaletteMode } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { getDesignTokens } from "@/utils/mui/theme";

const useColorTheme = () => {
  const [mode, setMode] = useState<PaletteMode>("light");
  const [isHydrated, setIsHydrated] = useState(false); // Hydration check

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMode = (localStorage.getItem("themeMode") as PaletteMode) || "light";
      setMode(storedMode);
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("themeMode", mode);
    }
  }, [mode, isHydrated]);

  const toggleColorMode = (newMode: PaletteMode) => {
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const modifiedTheme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
    isHydrated,
  };
};

export default useColorTheme;
