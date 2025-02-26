"use client";

import { useThemeContext } from "@/context/ThemeContext";
import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

const ToggleMode = () => {
  const { mode, toggleColorMode } = useThemeContext();

  const handleToggle = () => {
    toggleColorMode(mode === "light" ? "dark" : "light");
  };

  return (
    <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
      <IconButton onClick={handleToggle}>
        {mode === "light" ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
};

export default ToggleMode;
