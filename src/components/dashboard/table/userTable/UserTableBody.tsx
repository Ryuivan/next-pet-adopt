import { User } from "@/types/model/User";
import { Delete, Edit } from "@mui/icons-material";
import {
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

type UserTableBodyProps = {
  users: User[] | null;
};

const UserTableBody = ({ users }: UserTableBodyProps) => {
  return (
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
                <IconButton aria-label="delete" color="error">
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
  );
};

export default UserTableBody;
