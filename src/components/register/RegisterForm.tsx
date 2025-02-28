"use client";

import { registerUser } from "@/actions/auth/actions";
import { useThemeContext } from "@/context/ThemeContext";
import { MakeErrorToast, MakeSuccessToast } from "@/utils/toast/Toast";
import {
  RegisterFormSchema,
  RegisterFormData,
} from "@/utils/zod/RegisterFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../ui/errors/FormErrorMessage";

const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mode } = useThemeContext();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);

    try {
      const { success } = await registerUser(data);
      if (!success) {
        throw new Error("Failed to register user");
      }

      MakeSuccessToast("User registered successfully", mode);

      push("/login");
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
      {/* Username Field */}
      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <TextField
          {...register("username")}
          label="Username"
          variant="filled"
          fullWidth
          
          error={!!errors.username}
        />
        {errors.username && (
          <FormErrorMessage message={errors.username.message} />
        )}
      </FormControl>

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

      {/* Password Field */}
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
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
