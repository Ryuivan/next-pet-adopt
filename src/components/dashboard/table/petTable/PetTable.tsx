import DashboardTableContainer from "../DashboardTableContainer";
import PetTableHead from "./PetTableHead";
import { getAllPetsAndUsername } from "@/actions/pet/actions";
import PetTableBody from "./PetTableBody";

const PetTable = async () => {
  const pets = await getAllPetsAndUsername();

  return (
    <DashboardTableContainer>
      <PetTableHead />
      <PetTableBody pets={pets} />
    </DashboardTableContainer>
  );
};

export default PetTable;
