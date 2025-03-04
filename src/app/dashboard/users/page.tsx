import UserTable from "@/components/dashboard/table/userTable/UserTable";
import DashboardPageTitle from "@/components/ui/title/DashboardPageTitle";
import { Box, Skeleton } from "@mui/material";
import { Suspense } from "react";

const UsersDashboardPage = () => {
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          marginBottom: "32px",
        }}
      >
        <DashboardPageTitle title="User List" />
      </Box>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height="80vh" />}
      >
        <UserTable />
      </Suspense>
    </Box>
  );
};

export default UsersDashboardPage;
