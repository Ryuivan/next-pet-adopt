import { getUserById } from "@/actions/user/actions";
import UpdateUserDashboardForm from "@/components/dashboard/form/updateUser/UpdateUserDashboardForm";
import FormTitle from "@/components/ui/title/FormTitle";
import { Container } from "@mui/material";

type UserDashboardUpdatePageProps = {
  params: Promise<{ id: string }>;
};

const UserDashboardUpdatePage = async ({
  params,
}: UserDashboardUpdatePageProps) => {
  const { id } = await params;
  const user = await getUserById(id);

  return (
    <Container sx={{ width: "100%" }} maxWidth="sm">
      <FormTitle title="Update User" />
      <UpdateUserDashboardForm user={user} />
    </Container>
  );
};

export default UserDashboardUpdatePage;
