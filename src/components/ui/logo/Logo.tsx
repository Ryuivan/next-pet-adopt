"use client";

import { useThemeContext } from "@/context/ThemeContext";
import { Box } from "@mui/material";
import Image from "next/image";

type LogoProps = {
  width?: string;
  height?: string;
};

const Logo = ({ width, height }: LogoProps) => {
  const { mode } = useThemeContext();
  console.log(mode)

  return (
    <Box
      sx={{
        position: "relative",
        width: width || "100%",
        height: height || "100%",
      }}
    >
      <Image
        src={
          mode === "light"
            ? "/logo/petadopt-logo.png"
            : "/logo/petadopt-logo-dark.png"
        }
        alt="PetAdopt Logo"
        fill
        style={{ objectFit: "contain" }}
      />
    </Box>
  );
};

export default Logo;
