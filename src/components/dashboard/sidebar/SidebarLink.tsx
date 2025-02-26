import { RouteType } from "@/types/RouteType";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";

type SidebarLinkProps = RouteType & {
  open: boolean;
};

const SidebarLink = ({ name, href, icon, open }: SidebarLinkProps) => {
  return (
    <Link href={href} passHref>
      <ListItem disablePadding sx={{ display: "block" }}>
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
