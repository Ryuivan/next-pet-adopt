import PetSection from "@/components/pets/PetSection";
import PageTitle from "@/components/ui/title/PageTitle";
import { Container, Skeleton } from "@mui/material";
import { Suspense } from "react";

type PetsPageProps = {
  searchParams: { query?: string; page?: string; category?: string };
};

const PetsPage = async ({ searchParams }: PetsPageProps) => {
  const params = await searchParams;
  const query = params?.query || "";
  const currentPage = Number(params?.page) || 1;

  return (
    <Container
      maxWidth="xl"
      className="with-header"
      sx={{
        marginBottom: "60px",
      }}
    >
      <PageTitle title="Pets" />

      <PetSection query={query} currentPage={currentPage} />
    </Container>
  );
};

export default PetsPage;
