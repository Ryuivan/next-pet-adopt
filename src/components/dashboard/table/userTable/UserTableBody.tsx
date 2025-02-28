"use client";

import { deleteUser } from "@/actions/user/actions";
import DeleteDialog from "@/components/ui/dialog/DeleteDialog";
import { useThemeContext } from "@/context/ThemeContext";
import { User } from "@/types/model/User";
import { MakeErrorToast, MakeSuccessToast } from "@/utils/toast/Toast";
import { Delete, Edit } from "@mui/icons-material";
import {
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useState } from "react";

type UserTableBodyProps = {
  users: User[] | null;
};

const UserTableBody = ({ users }: UserTableBodyProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { mode } = useThemeContext();

  const handleOpen = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      const success = await deleteUser(selectedUser.id);
      if (success) {
        MakeSuccessToast("User deleted successfully", mode);
      } else {
        MakeErrorToast("Failed to delete user", mode);
      }
    }
    handleClose();
  };

  return (
    <>
      <TableBody>
        {users && users.length > 0 ? (
          users.map((user: User) => (
            <TableRow
              key={user.username}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  textAlign: "left",
                }}
              >
                {user.username}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {user.email}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
              >
                {user.role}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {new Date(user.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {new Date(user.updated_at).toLocaleDateString()}
              </TableCell>

              <TableCell
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <IconButton aria-label="edit" color="warning">
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => handleOpen(user)}
                  >
                    <Delete />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} align="center">
              No users found
            </TableCell>
          </TableRow>
        )}
      </TableBody>

      <DeleteDialog
        open={open}
        title="Delete User"
        description={`Are you sure you want to delete user "${selectedUser?.username}"?`}
        onClose={handleClose}
        onConfirm={handleDeleteUser}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default UserTableBody;
