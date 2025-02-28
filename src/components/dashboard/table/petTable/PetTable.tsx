import { Stack } from "@mui/material";
import DashboardTableContainer from "../DashboardTableContainer";
import PetTableHead from "./PetTableHead";
// import UserTableBody from "./UserTableBody";
import { getAllPets } from "@/actions/pet/actions";

const PetTable = async () => {
  const pets = await getAllPets();

  return (
    <DashboardTableContainer>
      <PetTableHead />
      {/* <UserTableBody users={users} /> */}
    </DashboardTableContainer>
  );
};

export default PetTable;
