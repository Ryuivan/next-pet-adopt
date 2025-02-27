"use client";

import { Card, Stack, Box, Typography } from "@mui/material";
import CountUp from "react-countup";

type MainCardContentProps = {
  title: string;
  number: number;
  icon: JSX.Element;
};

const MainCardContent = ({ title, number, icon }: MainCardContentProps) => {
  return (
    <Card
      sx={{
        padding: "24px",
        height: "100%",
      }}
    >
      <Stack
        direction="column"
        width="100%"
        height="100%"
        justifyContent="center"
      >
        <Box
          sx={{
            color: "primary.main",
            flex: 1,
          }}
        >
          {icon}
        </Box>
        <Box
          sx={{
            flex: 1,
            marginTop: "16px",
          }}
        >
          <Typography fontSize="24px" fontWeight={600}>
            <CountUp end={number} duration={2} />
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Typography fontSize="16px" fontWeight={400}>
            {title}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default MainCardContent;
