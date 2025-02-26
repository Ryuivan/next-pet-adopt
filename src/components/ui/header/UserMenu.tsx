"use client";

import { logout } from "@/actions/auth/actions";
import { useThemeContext } from "@/context/ThemeContext";
import { User } from "@/types/model/User";
import { MakeSuccessToast } from "@/utils/toast/Toast";
import { Logout, AccountCircleOutlined, Dashboard } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

type UserMenuProps = Pick<User, "username" | "role">;

const UserMenu = ({ username, role }: UserMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { push } = useRouter();
  const { mode } = useThemeContext();
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleClose();

    MakeSuccessToast("Logout successful", mode);
    push("/login");
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            <Typography fontSize="14px" fontWeight={600} color="text.primary">
              {username.at(0)?.toUpperCase()}
            </Typography>
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              minWidth: 150, // Ubah lebar menu di sini
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {role === "admin" && (
          <Link href="/dashboard" passHref>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>

              <Typography fontSize="14px" fontWeight={500}>
                Dashboard
              </Typography>
            </MenuItem>
          </Link>
        )}

        <Link href={`/profile/${username}`} passHref>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>

            <Typography fontSize="14px" fontWeight={500}>
              My Profile
            </Typography>
          </MenuItem>
        </Link>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>

          <Typography fontSize="14px" fontWeight={500}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
