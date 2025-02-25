import { AppBar, Box, Container, Stack, Toolbar } from "@mui/material";
import Logo from "../logo/Logo";
import HeaderRoute from "./HeaderRoute";
import ToggleMode from "../themeMode/ToggleMode";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "background.paper",
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
            {/* <Logo /> */}
            <Stack justifyContent="flex-start">
              <Logo width="150px" height="50px" />
            </Stack>

            {/* <Search /> */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              justifyContent="center"
              flex={1}
            >
              <HeaderRoute />
            </Stack>

            {/* <UserMenu /> */}
            <Stack justifyContent="flex-end" flex={1}>
              <ToggleMode />
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
