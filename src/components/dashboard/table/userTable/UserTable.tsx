import { getAllUsers } from "@/actions/user/actions";
import DashboardTableContainer from "../DashboardTableContainer";
import UserTableBody from "./UserTableBody";
import UserTableHead from "./UserTableHead";

const UserTable = async () => {
  const users = await getAllUsers();

  return (
    <DashboardTableContainer>
      <UserTableHead />
      <UserTableBody users={users} />
    </DashboardTableContainer>
  );
};

export default UserTable;
