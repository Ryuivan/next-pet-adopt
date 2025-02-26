import { fetchUserData } from "@/actions/user/actions";
import HeaderContent from "./HeaderContent";

const Header = async () => {
  const { user, role } = await fetchUserData();

  return <HeaderContent user={user} role={role} />;
};

export default Header;
