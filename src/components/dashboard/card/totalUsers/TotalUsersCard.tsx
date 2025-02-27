import { getTotalUsers } from "@/actions/user/actions";
import SideCardContent from "../SideCardContent";
import { Person } from "@mui/icons-material";

const TotalUsersCard = async () => {
  const totalUsers = await getTotalUsers();

  return (
    <SideCardContent
      title="Total users"
      number={totalUsers}
      icon={<Person fontSize="large" />}
    />
  );
};

export default TotalUsersCard;
