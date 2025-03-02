"use client";

import { useThemeContext } from "@/context/ThemeContext";
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
  Input,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MakeErrorToast, MakeSuccessToast } from "@/utils/toast/Toast";
import FormErrorMessage from "@/components/ui/errors/FormErrorMessage";
import { Pet } from "@/types/model/Pet";
import {
  UpdatePetFormData,
  UpdatePetFormSchema,
} from "@/utils/zod/UpdatePetFormSchema";
import { CloudUpload } from "@mui/icons-material";
import Image from "next/image";
import { updatePet } from "@/actions/pet/actions";
import { uploadImageToStorage } from "@/utils/supabase/storage";

type UpdatePetDashboardFormProps = {
  pet: Pet | null;
};

const UpdatePetDashboardForm = ({ pet }: UpdatePetDashboardFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [gender, setGender] = useState<string>(pet?.gender as "Male" | "Female" || "");
  const [petImage, setPetImage] = useState<string | File | undefined>(
    pet?.image || undefined
  );
  const { mode } = useThemeContext();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdatePetFormData>({
    resolver: zodResolver(UpdatePetFormSchema),
  });

  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
    setValue("gender", event.target.value as "Male" | "Female");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPetImage(objectUrl);
      setValue("image", file);
    }
  };

  const onSubmit = async (data: UpdatePetFormData) => {
    setLoading(true);

    try {
      let imageUrl = null;

      if (data.image instanceof File) {
        const { imageUrl: uploadedUrl, error } = await uploadImageToStorage({
          file: data.image,
          bucket: "pets_picture",
          folder: data.species,
        });

        if (error) throw new Error(error);
        imageUrl = uploadedUrl;
      }

      const success = await updatePet({
        ...data,
        id: pet?.id,
        image: imageUrl ?? undefined,
        date_of_birth: data.date_of_birth
          ? new Date(data.date_of_birth)
          : undefined,
      });

      if (!success) throw new Error("Failed to update pet");

      MakeSuccessToast("Update pet successful", mode);
      push("/dashboard/pets");
    } catch (error) {
      MakeErrorToast("Error updating pet", mode);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      {/* Name Field */}
      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <TextField
          {...register("name")}
          label="Name"
          variant="filled"
          fullWidth
          defaultValue={pet?.name}
          error={!!errors.name}
        />
        {errors.name && <FormErrorMessage message={errors.name.message} />}
      </FormControl>

      {/* Species Field */}
      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <TextField
          {...register("species")}
          label="Species"
          variant="filled"
          fullWidth
          defaultValue={pet?.species}
          error={!!errors.species}
        />
        {errors.species && (
          <FormErrorMessage message={errors.species.message} />
        )}
      </FormControl>

      {/* Breed Field */}
      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <TextField
          {...register("breed")}
          label="Breed"
          variant="filled"
          fullWidth
          defaultValue={pet?.breed}
          error={!!errors.breed}
        />
        {errors.breed && <FormErrorMessage message={errors.breed.message} />}
      </FormControl>

      {/* Gender Field */}
      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <InputLabel id="gender-select">Gender</InputLabel>
        <Select
          labelId="gender-select"
          label="Gender"
          variant="filled"
          fullWidth
          value={gender as "Male" | "Female"}
          onChange={handleGenderChange}
          error={!!errors.gender}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>

        {errors.gender && <FormErrorMessage message={errors.gender.message} />}
      </FormControl>

      {/* Age Field */}
      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <TextField
          {...register("age", { valueAsNumber: true })}
          label="Age"
          variant="filled"
          fullWidth
          error={!!errors.age}
          defaultValue={pet?.age}
          type="number"
        />
        {errors.age && <FormErrorMessage message={errors.age.message} />}
      </FormControl>

      {/* Date of Birth Field */}
      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <TextField
          {...register("date_of_birth")}
          variant="filled"
          label="Date of Birth"
          fullWidth
          error={!!errors.date_of_birth}
          type="date"
          defaultValue={
            pet?.date_of_birth
              ? new Date(pet.date_of_birth).toISOString().split("T")[0]
              : ""
          }
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        {errors.date_of_birth && (
          <FormErrorMessage message={errors.date_of_birth.message} />
        )}
      </FormControl>

      {/* Image upload */}
      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          fullWidth
          startIcon={<CloudUpload />}
        >
          Upload Pet Image
          <Input
            type="file"
            onChange={handleFileChange}
            inputProps={{ accept: "image/*" }}
            sx={{ display: "none" }}
          />
        </Button>

        {petImage && (
          <Stack
            direction="row"
            width="100%"
            justifyContent="center"
            sx={{
              marginTop: "16px",
              textAlign: "center",
            }}
          >
            <Image
              src={petImage as string}
              alt="Pet Image Preview"
              width={200}
              height={200}
              style={{
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </Stack>
        )}
      </FormControl>

      {/* Submit Button */}
      <Button type="submit" variant="contained" fullWidth loading={loading}>
        Save
      </Button>
    </Box>
  );
};

export default UpdatePetDashboardForm;
