import { Box, Typography } from "@mui/material";

type PageTitleProps = {
  title: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        marginY: "48px",
      }}
    >
      <Typography
        color="text.primary"
        fontSize="32px"
        textAlign="center"
        fontWeight={600}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default PageTitle;
