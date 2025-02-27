import { getMonthlyPets } from "@/actions/pet/actions";
import MainCardContent from "../MainCardContent";
import { Pets } from "@mui/icons-material";

const MonthlyPetsCard = async () => {
  const monthlyPets = await getMonthlyPets();

  return (
    <MainCardContent title="New pets this month" number={monthlyPets} icon={<Pets fontSize="large" />} />
  )
}

export default MonthlyPetsCard
