import { getUserSession } from "@/actions/auth/actions";
import AddNewPetForm from "@/components/dashboard/form/addNewPet/AddNewPetForm";
import FormTitle from "@/components/ui/title/FormTitle";
import { Container } from "@mui/material";

const AddNewPetPage = async () => {
  const user = await getUserSession();
  const id = user?.user?.id;

  return (
    <Container sx={{ width: "100%" }} maxWidth="sm">
      <FormTitle title="Add New Pet" />
      <AddNewPetForm userId={id!} />
    </Container>
  );
};

export default AddNewPetPage;
