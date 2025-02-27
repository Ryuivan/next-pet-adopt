import { Box, Typography } from "@mui/material";

type DashboardPageTitleProps = {
  title: string;
};

const DashboardPageTitle = ({ title }: DashboardPageTitleProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "32px",
      }}
    >
      <Typography color="text.primary" fontWeight={600} fontSize="24px">
        {title}
      </Typography>
    </Box>
  );
};

export default DashboardPageTitle;
