"use client";

import { resetPassword } from "@/actions/auth/actions";
import { useThemeContext } from "@/context/ThemeContext";
import { MakeSuccessToast, MakeErrorToast } from "@/utils/toast/Toast";
import {
  ResetPasswordFormData,
  ResetPasswordFormSchema,
} from "@/utils/zod/ResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, FormControl, TextField, Button } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../ui/errors/FormErrorMessage";

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams()
  const { mode } = useThemeContext();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordFormSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setLoading(true);

    try {
      const { success } = await resetPassword(data.newPassword, searchParams.get("code") as string);

      if (!success) {
        throw new Error("Failed to send reset email");
      }

      MakeSuccessToast("Reset password successful", mode);
      push("/");
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
      {/* New Password Field */}
      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <TextField
          {...register("newPassword")}
          label="New Password"
          variant="filled"
          fullWidth
          error={!!errors.newPassword}
          type="password"
        />
        {errors.newPassword && (
          <FormErrorMessage message={errors.newPassword.message} />
        )}
      </FormControl>

      {/* New Password Field */}
      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <TextField
          {...register("confirmPassword")}
          label="Confirm Password"
          variant="filled"
          fullWidth
          error={!!errors.confirmPassword}
          type="password"
        />
        {errors.confirmPassword && (
          <FormErrorMessage message={errors.confirmPassword.message} />
        )}
      </FormControl>

      {/* Submit Button */}
      <Button type="submit" variant="contained" fullWidth loading={loading}>
        Reset Password
      </Button>
    </Box>
  );
};

export default ResetPasswordForm;
