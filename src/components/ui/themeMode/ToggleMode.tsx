"use client";

import { useThemeContext } from "@/context/ThemeContext";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Button, PaletteMode } from "@mui/material";
import { useState } from "react";

const ToggleMode = () => {
  const { mode, toggleColorMode } = useThemeContext();
  const [colorMode, setColorMode] = useState<PaletteMode>(mode);

  const handleToggle = (newMode: PaletteMode) => {
    toggleColorMode(newMode);
    setColorMode(newMode);
  };

  return (
    <>
      {colorMode === "light" ? (
        <Button onClick={() => handleToggle("dark")}>
          <LightMode />
        </Button>
      ) : (
        <Button onClick={() => handleToggle("light")}>
          <DarkMode />
        </Button>
      )}
    </>
  );
};

export default ToggleMode;
