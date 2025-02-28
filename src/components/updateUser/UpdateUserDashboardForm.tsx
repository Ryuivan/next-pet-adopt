"use client";

import { useThemeContext } from "@/context/ThemeContext";
import {
  UpdateUserDashboardFormData,
  UpdateUserDashboardFormSchema,
} from "@/utils/zod/UpdateUserFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  FormControl,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../ui/errors/FormErrorMessage";
import { User } from "@/types/model/User";
import { updateUser } from "@/actions/user/actions";
import { MakeErrorToast, MakeSuccessToast } from "@/utils/toast/Toast";

type UpdateUserDashboardFormProps = {
  user: User | null;
};

const UpdateUserDashboardForm = ({ user }: UpdateUserDashboardFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<User>(user || ({} as User));
  const { mode } = useThemeContext();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserDashboardFormData>({
    resolver: zodResolver(UpdateUserDashboardFormSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      role: user?.role || "user",
    },
  });

  const handleChange = (event: SelectChangeEvent) => {
    const newRole = event.target.value as "user" | "admin";
    setNewUser({ ...newUser, role: newRole });
    setValue("role", newRole);
  };

  const onSubmit = async (data: UpdateUserDashboardFormData) => {
    setLoading(true);

    try {
      const newData = { ...data, id: user?.id };

      const success = await updateUser(newData);
      if (!success) throw new Error("Error updating user");

      MakeSuccessToast("Update user successful", mode);
      push("/dashboard/users");
    } catch (error) {
      MakeErrorToast("Error updating user", mode);
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
          defaultValue={user?.username}
          error={!!errors.username}
          disabled
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
          defaultValue={user?.email}
          error={!!errors.email}
          disabled
        />
        {errors.email && <FormErrorMessage message={errors.email.message} />}
      </FormControl>

      {/* Role Field */}
      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <InputLabel id="role-select">Role</InputLabel>
        <Select
          labelId="role-select"
          label="Role"
          variant="filled"
          value={newUser.role || ""}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>

      {/* Submit Button */}
      <Button type="submit" variant="contained" fullWidth loading={loading}>
        Save
      </Button>
    </Box>
  );
};

export default UpdateUserDashboardForm;
