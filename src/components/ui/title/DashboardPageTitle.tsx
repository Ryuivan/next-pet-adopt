import { Box, Typography } from "@mui/material";

type DashboardPageTitleProps = {
  title: string;
};

const DashboardPageTitle = ({ title }: DashboardPageTitleProps) => {
  return (
    <Typography color="text.primary" fontWeight={600} fontSize="24px">
      {title}
    </Typography>
  );
};

export default DashboardPageTitle;
