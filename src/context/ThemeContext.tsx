"use client";

import useColorTheme from "@/hooks/useColorTheme";
import { Theme } from "@emotion/react";
import {
  ThemeProvider,
  createTheme,
  PaletteMode,
  CssBaseline,
} from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext } from "react";

type ThemeContextType = {
  mode: PaletteMode;
  theme: Theme;
  toggleColorMode: (newMode: PaletteMode) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  theme: createTheme(),
  toggleColorMode: () => {},
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { theme, mode, toggleColorMode, isHydrated } = useColorTheme();

  // Tunda render sampai hydration selesai
  if (!isHydrated) return null;

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
