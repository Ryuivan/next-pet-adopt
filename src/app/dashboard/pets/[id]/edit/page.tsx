import { getPetById } from "@/actions/pet/actions";
import UpdatePetDashboardForm from "@/components/dashboard/form/updatePet/UpdatePetDashboardForm";
import FormTitle from "@/components/ui/title/FormTitle";
import { Container } from "@mui/material";

type PetDashboardUpdatePageProps = {
  params: Promise<{ id: string }>;
};

const PetDashboardUpdatePage = async ({
  params,
}: PetDashboardUpdatePageProps) => {
  const { id } = await params;
  const pet = await getPetById(id);

  return (
    <Container sx={{ width: "100%" }} maxWidth="sm">
      <FormTitle title="Update Pet" />
      <UpdatePetDashboardForm pet={pet} />
    </Container>
  );
};

export default PetDashboardUpdatePage;
