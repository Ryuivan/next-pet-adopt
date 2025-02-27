"use client";

import { RouteType } from "@/types/RouteType";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarLinkProps = RouteType & {
  open: boolean;
};

const SidebarLink = ({ name, href, icon, open }: SidebarLinkProps) => {
  const pathname = usePathname();

  return (
    <Link href={href} passHref>
      <ListItem
        disablePadding
        sx={{
          display: "block",
          backgroundColor: pathname === href ? "primary.main" : "transparent",
          color: pathname === href ? "white" : "inherit",
        }}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5,
            justifyContent: open ? "initial" : "center",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              justifyContent: "center",
              mr: open ? 3 : "auto",
              color: "inherit",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarLink;
