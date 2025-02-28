import { ChildrenType } from "@/types/ChildrenType";
import { Box, Paper, Table, TableContainer } from "@mui/material";

const DashboardTableContainer = ({ children }: ChildrenType) => {
  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        maxWidth: "100vw",
      }}
    >
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
    </Box>
  );
};

export default DashboardTableContainer;
