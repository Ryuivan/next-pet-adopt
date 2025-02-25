import RegisterForm from "@/components/register/RegisterForm";
import FormTitle from "@/components/ui/title/FormTitle";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <FormTitle title="Register" />
      <RegisterForm />

      <Stack
        spacing="4px"
        direction="row"
        alignItems="center"
        sx={{
          marginTop: "16px",
        }}
      >
        <Typography fontWeight={500} fontSize="14px">
          Already have an account?
        </Typography>
        <Link href="/login" passHref>
          <Typography
            color="text.primary"
            fontWeight={700}
            fontSize="14px"
            sx={{
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
                color: "text.secondary",
              },
            }}
          >
            Login
          </Typography>
        </Link>
      </Stack>
    </Box>
  );
};

export default RegisterPage;
