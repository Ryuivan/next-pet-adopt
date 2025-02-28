"use client";

import { useState, ReactNode } from "react";
import {
  ChevronLeft,
  Dashboard,
  Menu,
  Person,
  Pets,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  List,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { User } from "@supabase/supabase-js";
import SideAppBar from "./SideAppBar";
import SidebarDrawer from "./SidebarDrawer";
import SidebarDrawerHeader from "./SidebarDrawerHeader";
import SidebarLink from "./SidebarLink";
import ToggleMode from "../../ui/themeMode/ToggleMode";
import Logo from "../../ui/logo/Logo";
import UserMenu from "../../ui/header/UserMenu";
import { RouteType } from "@/types/RouteType";

interface SidebarContentProps {
  user: User | null;
  role: "user" | "admin";
  children: ReactNode;
}

const SidebarContent = ({ user, role, children }: SidebarContentProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const drawerWidth = 240;

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const routes: RouteType[] = [
    { name: "Dashboard", href: "/dashboard", icon: <Dashboard /> },
    { name: "Users", href: "/dashboard/users", icon: <Person /> },
    { name: "Pets", href: "/dashboard/pets", icon: <Pets /> },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <SideAppBar position="fixed" open={open} drawerWidth={drawerWidth}>
        <Toolbar>
          <Stack
            direction="row"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Left Section */}
            <Stack direction="row" alignItems="center" flex={1}>
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: "40px", ...(open && { display: "none" }) }}
              >
                <Menu />
              </IconButton>
              <Typography fontSize="16px" fontWeight={600}>
                <Logo width="100px" height="50px" />
              </Typography>
            </Stack>

            {/* Right Section */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <ToggleMode />
              <UserMenu
                username={user?.user_metadata.username ?? ""}
                role={role}
              />
            </Stack>
          </Stack>
        </Toolbar>
      </SideAppBar>

      {/* Sidebar Drawer */}
      <SidebarDrawer variant="permanent" open={open}>
        <SidebarDrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </SidebarDrawerHeader>

        <Divider />

        <List>
          {routes.map(({ name, href, icon }) => (
            <SidebarLink
              key={href}
              name={name}
              href={href}
              icon={icon}
              open={open}
            />
          ))}
        </List>
      </SidebarDrawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <SidebarDrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default SidebarContent;
