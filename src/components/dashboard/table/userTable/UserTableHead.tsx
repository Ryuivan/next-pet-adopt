import { TableCell, TableHead, TableRow } from "@mui/material";

const UserTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          sx={{
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          Username
        </TableCell>
        <TableCell
          sx={{
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Email
        </TableCell>
        <TableCell
          sx={{
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Role
        </TableCell>
        <TableCell
          sx={{
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Created At
        </TableCell>
        <TableCell
          sx={{
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Updated At
        </TableCell>
        <TableCell
          sx={{
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default UserTableHead;
