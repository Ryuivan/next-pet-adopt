import { getUserSession } from "@/actions/auth/actions";
import { ChildrenType } from "@/types/ChildrenType";
import { Container } from "@mui/material";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: ChildrenType) => {
  const response = await getUserSession()
  if (response?.user) redirect("/") 
  
  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: "64px",
        paddingY: "32px",
        backgroundColor: "background.paper",
        borderRadius: "16px",
        width: "100%",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      {children}
    </Container>
  );
};

export default AuthLayout;
