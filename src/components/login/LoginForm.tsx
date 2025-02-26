"use client";

import { useThemeContext } from "@/context/ThemeContext";
import { MakeErrorToast, MakeSuccessToast } from "@/utils/toast/Toast";
import { LoginFormData, LoginFormSchema } from "@/utils/zod/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../ui/errors/FormErrorMessage";
import { login } from "@/actions/auth/actions";

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mode } = useThemeContext();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);

    try {
      const { success } = await login(data);
      if (!success) throw new Error("Login failed");

      MakeSuccessToast("Login successful", mode);
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
      {/* Email field */}
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

      {/* Password field */}
      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <TextField
          {...register("password")}
          label="Password"
          type="password"
          variant="filled"
          fullWidth
          error={!!errors.password}
        />
        {errors.password && (
          <FormErrorMessage message={errors.password.message} />
        )}
      </FormControl>

      {/* Submit Button */}
      <Button type="submit" variant="contained" fullWidth loading={loading}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
