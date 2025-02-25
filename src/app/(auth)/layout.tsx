import { ChildrenType } from "@/types/ChildrenType";
import { Container, Stack } from "@mui/material";

const AuthLayout = ({ children }: ChildrenType) => {
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
