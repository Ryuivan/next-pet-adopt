import { fetchUserData } from "@/actions/user/actions";
import { ChildrenType } from "@/types/ChildrenType";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { redirect } from "next/navigation"; // ⬅️ Gunakan redirect()


const DashboardPagesLayout = async ({ children }: ChildrenType) => {
  const { user, role } = await fetchUserData();

  if (!user || role !== "admin") {
    redirect("/");
  }

  return (
    <Sidebar>
      {children}
      
    </Sidebar>
  );
};

export default DashboardPagesLayout;
