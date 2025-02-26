"use client";

import { useThemeContext } from "@/context/ThemeContext";
import {
  ForgotPasswordFormData,
  ForgotPasswordFormSchema,
} from "@/utils/zod/ForgotPasswordFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../ui/errors/FormErrorMessage";
import { forgotPassword } from "@/actions/auth/actions";
import { MakeErrorToast, MakeSuccessToast } from "@/utils/toast/Toast";

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mode } = useThemeContext();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordFormSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);

    try {
      const { success } = await forgotPassword(data);

      if (!success) {
        throw new Error("Failed to send reset email");
      }

      MakeSuccessToast("Reset email sent", mode);
    } catch (error) {
      MakeErrorToast(
        error instanceof Error ? error.message : "Error register user",
        mode
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      {/* Email Field */}
      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <TextField
          {...register("email")}
          label="Email"
          variant="filled"
          fullWidth
          error={!!errors.email}
        />
        {errors.email && <FormErrorMessage message={errors.email.message} />}
      </FormControl>

      {/* Submit Button */}
      <Button type="submit" variant="contained" fullWidth loading={loading}>
        Send Email
      </Button>
    </Box>
  );
};

export default ForgotPasswordForm;
