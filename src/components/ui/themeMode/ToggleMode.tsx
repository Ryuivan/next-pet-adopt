"use client";

import { useThemeContext } from "@/context/ThemeContext";
import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const ToggleMode = () => {
  const { mode, toggleColorMode } = useThemeContext();

  const handleToggle = () => {
    toggleColorMode(mode === "light" ? "dark" : "light");
  };

  return (
    <IconButton onClick={handleToggle}>
      {mode === "light" ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
};

export default ToggleMode;
