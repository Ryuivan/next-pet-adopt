import { TableCell, TableHead, TableRow } from "@mui/material";

const PetTableHead = () => {
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
          Name
        </TableCell>
        <TableCell
          sx={{
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Image
        </TableCell>
        <TableCell
          sx={{
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Species
        </TableCell>
        <TableCell
          sx={{
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Breed
        </TableCell>
        <TableCell
          sx={{
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Gender
        </TableCell>
        <TableCell
          sx={{
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Age
        </TableCell>
        <TableCell
          sx={{
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Date of Birth
        </TableCell>
        <TableCell
          sx={{
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Owner
        </TableCell>
        <TableCell
          sx={{
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Added By
        </TableCell>
        <TableCell
          sx={{
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Created at
        </TableCell>
        <TableCell
          sx={{
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Updated at
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

export default PetTableHead;
