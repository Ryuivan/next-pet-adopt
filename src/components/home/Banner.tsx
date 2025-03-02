import { Box } from "@mui/material";
import Image from "next/image";

const Banner = () => {
  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "lg",
        width: "100%",
        height: "100%",
      }}
    >
      <Image
        src="/banner/banner1.jpg"
        alt="Adopt Banner"
        width={1920}
        height={2000}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          width: "100%",
          height: "auto",
          borderRadius: "16px",
        }}
      />
    </Box>
  );
};

export default Banner;
