import LoginForm from "@/components/login/LoginForm";
import FormTitle from "@/components/ui/title/FormTitle";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";

const LoginPage = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <FormTitle title="Login" />
      <LoginForm />

      <Stack
        spacing="4px"
        direction="row"
        alignItems="center"
        sx={{
          marginTop: "16px",
        }}
      >
        <Typography fontWeight={500} fontSize="14px">
          Don&apos;t have an account?
        </Typography>
        <Link href="/register" passHref>
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
            Register
          </Typography>
        </Link>
      </Stack>

      <Stack
        spacing="4px"
        direction="row"
        alignItems="center"
        sx={{
          marginTop: "8px",
        }}
      >
        <Typography fontWeight={500} fontSize="14px">
          Forgot your password?
        </Typography>
        <Link href="/reset-password" passHref>
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
            Reset password
          </Typography>
        </Link>
      </Stack>
    </Box>
  );
};

export default LoginPage;
