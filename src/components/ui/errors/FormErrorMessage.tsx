import { Typography } from "@mui/material";

type FormErrorMessageProps = {
  message: string | undefined;
};

const FormErrorMessage = ({ message }: FormErrorMessageProps) => {
  return (
    <Typography fontSize="12px" fontWeight={500} color="error">
      {message}
    </Typography>
  );
};

export default FormErrorMessage;
