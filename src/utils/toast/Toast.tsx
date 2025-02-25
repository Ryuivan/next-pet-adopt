"use client";

import { useThemeContext } from "@/context/ThemeContext";
import { PaletteMode } from "@mui/material";
import { Bounce, toast } from "react-toastify";

export const MakeSuccessToast = (message: string, mode: PaletteMode) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: mode,
    transition: Bounce,
  });
};

export const MakeErrorToast = (message: string, mode: PaletteMode) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: mode,
    transition: Bounce,
  });
};
