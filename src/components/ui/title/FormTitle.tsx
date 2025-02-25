import { Box, Typography } from "@mui/material";

type FormTitleProps = {
  title: string;
};

const FormTitle = ({ title }: FormTitleProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "24px",
      }}
    >
      <Typography color="text.primary" fontWeight={600} fontSize="24px">
        {title}
      </Typography>
    </Box>
  );
};

export default FormTitle;
