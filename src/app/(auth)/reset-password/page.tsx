import ResetPasswordForm from "@/components/resetPassword/ResetPasswordForm"
import FormTitle from "@/components/ui/title/FormTitle"
import { Box } from "@mui/material"

const ResetPasswordPage = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <FormTitle title="Reset Password" />
      <ResetPasswordForm />


    </Box>
  )
}

export default ResetPasswordPage
