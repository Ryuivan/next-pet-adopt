import { fetchUserData } from "@/actions/user/actions";
import SidebarContent from "./SidebarContent";
import { ChildrenType } from "@/types/ChildrenType";

const Sidebar = async ({ children }: ChildrenType) => {
  const { user, role } = await fetchUserData();

  return (
    <SidebarContent user={user} role={role}>
      {children}
    </SidebarContent>
  );
};

export default Sidebar;
