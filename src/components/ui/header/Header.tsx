import { AppBar, Box, Container, Stack, Toolbar } from "@mui/material";
import Logo from "../logo/Logo";
import HeaderRoute from "./HeaderRoute";
import ToggleMode from "../themeMode/ToggleMode";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import LoginButton from "@/components/login/LoginButton";
import UserMenu from "./UserMenu";

const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "background.primary",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack
            direction="row"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              paddingY: "16px",
            }}
          >
            {/* Logo */}
            <Stack justifyContent="flex-start">
              <Link href="/" passHref>
                <Logo width="150px" height="50px" />
              </Link>
            </Stack>

            {/* Route */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              justifyContent="center"
              flex={1}
            >
              <HeaderRoute />
            </Stack>

            {/* UserMenu */}
            <Stack
              direction="row"
              justifyContent="flex-end"
              flex={1}
              spacing={2}
            >
              <ToggleMode />
              {user ? (
                <UserMenu username={user.user_metadata.username} role={user.role as "user" | "admin"} />
              ) : (
                <LoginButton />
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
