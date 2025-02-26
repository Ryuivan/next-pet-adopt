import { Button } from "@mui/material";
import Link from "next/link";

const LoginButton = () => {
  return (
    <Link href="/login" passHref>
      <Button variant="contained" color="primary">
        Login
      </Button>
    </Link>
  );
};

export default LoginButton;
