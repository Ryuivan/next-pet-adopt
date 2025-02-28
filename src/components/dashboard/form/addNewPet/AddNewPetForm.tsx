"use client";

import { createPet } from "@/actions/pet/actions";
import FormErrorMessage from "@/components/ui/errors/FormErrorMessage";
import { useThemeContext } from "@/context/ThemeContext";
import { uploadImageToStorage } from "@/utils/supabase/storage";
import { MakeErrorToast, MakeSuccessToast } from "@/utils/toast/Toast";
import {
  AddNewPetFormData,
  AddNewPetFormSchema,
} from "@/utils/zod/AddNewPetFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type AddNewPetFormProps = {
  userId: string;
};

const AddNewPetForm = ({ userId }: AddNewPetFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [petImage, setPetImage] = useState<string | null>(null);
  const { mode } = useThemeContext();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddNewPetFormData>({
    resolver: zodResolver(AddNewPetFormSchema),
    defaultValues: {
      gender: "Male",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPetImage(objectUrl);
      setValue("image", file);
    }
  };

  const onSubmit = async (data: AddNewPetFormData) => {
    setLoading(true);

    try {
      let imageUrl = null;

      if (data.image instanceof File) {
        const { imageUrl: uploadedUrl, error } = await uploadImageToStorage({
          file: data.image,
          bucket: "pets_pictures",
          folder: data.species,
        });
        
        if (error) throw new Error(error);
        imageUrl = uploadedUrl;
      }

      const newPet = {
        ...data,
        added_by: userId,
        date_of_birth: data.date_of_birth
          ? new Date(data.date_of_birth)
          : undefined,
        image: imageUrl || undefined,
      };

      const { success } = await createPet(newPet);
      if (!success) throw new Error("Failed to add new pet");

      MakeSuccessToast("Pet added successfully", mode);
      push("/dashboard/pets");
    } catch (error) {
      console.error(error);
      MakeErrorToast(
        error instanceof Error ? error.message : "Error adding new pet",
        mode
      );
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
          error={!!errors.breed}
        />
        {errors.breed && <FormErrorMessage message={errors.breed.message} />}
      </FormControl>

      {/* Gender Field */}
      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <InputLabel id="gender-select">Gender</InputLabel>
        <Select
          {...register("gender")}
          labelId="gender-select"
          label="Gender"
          variant="filled"
          fullWidth
          error={!!errors.gender}
        >
          <MenuItem value="Male" selected>
            Male
          </MenuItem>
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
              src={petImage}
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
        Submit
      </Button>
    </Box>
  );
};

export default AddNewPetForm;
