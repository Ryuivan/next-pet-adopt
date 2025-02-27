import { ChildrenType } from "@/types/ChildrenType";
import { Paper, Table, TableContainer } from "@mui/material";

const DashboardTableContainer = ({ children }: ChildrenType) => {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: "650px",
        }}
        aria-label="Table"
      >
        {children}
      </Table>
    </TableContainer>
  );
};

export default DashboardTableContainer;
