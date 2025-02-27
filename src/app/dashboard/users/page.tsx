import UserTable from "@/components/dashboard/table/userTable/UserTable";
import DashboardPageTitle from "@/components/ui/title/DashboardPageTitle";
import { Box, Skeleton } from "@mui/material";
import { Suspense } from "react";

const UsersDashboardPage = () => {
  return (
    <Box>
      <DashboardPageTitle title="User List" />
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height="100%" />}
      >
        <UserTable />
      </Suspense>
    </Box>
  );
};

export default UsersDashboardPage;
