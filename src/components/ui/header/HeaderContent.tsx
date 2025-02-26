"use client";

import LoginButton from "@/components/login/LoginButton";
import { AppBar, Toolbar, Stack, Container } from "@mui/material";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import Logo from "../logo/Logo";
import ToggleMode from "../themeMode/ToggleMode";
import HeaderRoute from "./HeaderRoute";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";

type HeaderContentProps = {
  user: User | null;
  role: "user" | "admin";
};

const HeaderContent = ({ user, role }: HeaderContentProps) => {
  const pathname = usePathname();

  return (
    !pathname.startsWith("/dashboard") && (
      <AppBar position="fixed" sx={{ backgroundColor: "background.primary" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              py={2}
            >
              {/* Logo */}
              <Link href="/" passHref>
                <Logo width="150px" height="50px" />
              </Link>

              {/* Routes */}
              <HeaderRoute />

              {/* User Actions */}
              <Stack direction="row" alignItems="center" spacing={2}>
                <ToggleMode />
                {user ? (
                  <UserMenu
                    username={user.user_metadata.username}
                    role={role}
                  />
                ) : (
                  <LoginButton />
                )}
              </Stack>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    )
  );
};

export default HeaderContent;
