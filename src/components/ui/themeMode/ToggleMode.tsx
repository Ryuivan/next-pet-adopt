"use client";

import { useThemeContext } from "@/context/ThemeContext";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Button } from "@mui/material";

const ToggleMode = () => {
  const { mode, toggleColorMode } = useThemeContext();

  const handleToggle = () => {
    toggleColorMode(mode === "light" ? "dark" : "light");
  };

  return (
    <Button onClick={handleToggle}>
      {mode === "light" ? <LightMode /> : <DarkMode />}
    </Button>
  );
};

export default ToggleMode;
