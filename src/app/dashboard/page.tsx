import MonthlyPetsCard from "@/components/dashboard/card/monthlyPets/MonthlyPetsCard";
import MonthlyUsersCard from "@/components/dashboard/card/monthlyUsers/MonthlyUsersCard";
import TotalPetsCard from "@/components/dashboard/card/totalPets/TotalPetsCard";
import TotalUsersCard from "@/components/dashboard/card/totalUsers/TotalUsersCard";
import {
  Grid2,
  Skeleton,
  Stack,
} from "@mui/material";
import { Suspense } from "react";

const DashboardPage = () => {
  return (
    <>
      <Grid2 container spacing={2} gap={2}>
        <Grid2
          size={{
            xs: 12,
            sm: 6,
            lg: 4,
          }}
          height="200px"
        >
          <Suspense
            fallback={
              <Skeleton
                variant="rounded"
                animation="wave"
                width="100%"
                height="100%"
              />
            }
          >
            <MonthlyUsersCard />
          </Suspense>
        </Grid2>

        <Grid2
          size={{
            xs: 12,
            sm: 6,
            lg: 4,
          }}
          height="200px"
        >
          <Suspense
            fallback={
              <Skeleton
                variant="rounded"
                animation="wave"
                width="100%"
                height="100%"
              />
            }
          >
            <MonthlyPetsCard />
          </Suspense>
        </Grid2>

        <Grid2
          height="200px"
          size={{
            xs: 12,
            lg: 4,
          }}
        >
          <Stack direction="column" spacing={2} width="100%" height="100%">
            <Suspense
              fallback={
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height="100%"
                />
              }
            >
              <TotalUsersCard />
            </Suspense>

            <Suspense
              fallback={
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width="100%"
                  height="100%"
                />
              }
            >
              <TotalPetsCard />
            </Suspense>
          </Stack>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2} gap={2} height="400px" marginTop={2}>
        {/* <Grid2
          size={{
            xs: 12,
            sm: 8,
          }}
        >
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2
          size={{
            xs: 12,
            sm: 4,
          }}
        >
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
        </Grid2> */}
      </Grid2>
    </>
  );
};

export default DashboardPage;
