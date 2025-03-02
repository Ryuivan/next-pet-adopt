import { Box, Grid2 } from "@mui/material";
import PageTitle from "../ui/title/PageTitle";
import { getNewestPets } from "@/actions/pet/actions";
import { Suspense } from "react";
import PetCardSkeleton from "./pets/PetCardSkeleton";
import PetCard from "./pets/PetCard";
import { getUserSession } from "@/actions/auth/actions";

const NewestPetsSection = async () => {
  const pets = await getNewestPets(4);
  const session = await getUserSession();
  const userId = session?.user?.id;

  return (
    <Box width="100%">
      <PageTitle title="Newest Pets" />

      <Grid2 container spacing={2}>
        {pets?.map((pet) => (
          <Suspense key={pet.id} fallback={<PetCardSkeleton />}>
            <PetCard pet={pet} userId={userId} />
          </Suspense>
        ))}
      </Grid2>
    </Box>
  );
};

export default NewestPetsSection;
