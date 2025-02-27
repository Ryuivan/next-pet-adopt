import { getTotalPets } from "@/actions/pet/actions";
import SideCardContent from "../SideCardContent";
import { Pets } from "@mui/icons-material";

const TotalPetsCard = async () => {
  const totalPets = await getTotalPets();

  return (
    <SideCardContent
      title="Total pets"
      number={totalPets}
      icon={<Pets fontSize="large" />}
    />
  );
};

export default TotalPetsCard;
