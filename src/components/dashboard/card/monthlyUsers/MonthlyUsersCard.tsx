import { getMonthlyUsers } from "@/actions/user/actions";
import MainCardContent from "../MainCardContent";
import { PersonAdd } from "@mui/icons-material";

const MonthlyUsersCard = async () => {
  const monthlyUsers = await getMonthlyUsers();

  return (
    <MainCardContent
      title="New users this month"
      number={monthlyUsers}
      icon={<PersonAdd fontSize="large" />}
    />
  );
};

export default MonthlyUsersCard;
