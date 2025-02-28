import PetTable from "@/components/dashboard/table/petTable/PetTable";
import DashboardPageTitle from "@/components/ui/title/DashboardPageTitle";
import { Box, Button, Skeleton, Stack } from "@mui/material";
import Link from "next/link";
import { Suspense } from "react";

const PetsDashboardPage = () => {
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        marginBottom="32px"
      >
        <DashboardPageTitle title="Pet List" />
        <Link href="/dashboard/pets/add">
          <Button variant="outlined">Add New Pet</Button>
        </Link>
      </Stack>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height="80vh" />}
      >
        <PetTable />
      </Suspense>
    </Box>
  );
};

export default PetsDashboardPage;
