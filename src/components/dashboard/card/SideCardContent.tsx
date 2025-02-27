"use client";

import { Card, Stack, Box, Typography } from "@mui/material";
import CountUp from "react-countup";

type SidebarContentProps = {
  title: string;
  number: number | null;
  icon: JSX.Element;
};

const SideCardContent = ({ title, number, icon }: SidebarContentProps) => {
  return (
    <Card
      sx={{
        padding: "16px",
        height: "100%",
      }}
    >
      <Stack
        direction="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
      >
        <Box
          sx={{
            color: "primary.main",
          }}
        >
          {icon}
        </Box>
        <Box flex={1}>
          <Typography fontSize="18px" fontWeight={600}>
            <CountUp end={number !== null ? number : -1} duration={2} />
          </Typography>
          <Typography fontSize="16px" fontWeight={400} marginTop="4px">
            {title}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default SideCardContent;
