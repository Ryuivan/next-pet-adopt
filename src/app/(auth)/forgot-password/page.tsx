import ForgotPasswordForm from "@/components/forgotPassword/ForgotPasswordForm"
import FormTitle from "@/components/ui/title/FormTitle"
import { Box } from "@mui/material"

const ForgotPasswordPage = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <FormTitle title="Forgot Password" />
      <ForgotPasswordForm />


    </Box>
  )
}

export default ForgotPasswordPage
