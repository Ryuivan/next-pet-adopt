"use client";

import { updatePetOwner } from "@/actions/pet/actions";
import { useThemeContext } from "@/context/ThemeContext";
import { MakeErrorToast, MakeSuccessToast } from "@/utils/toast/Toast";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AdoptPetButtonProps = {
  id: string;
  userId?: string;
};

const AdoptPetButton = ({ id, userId }: AdoptPetButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const { mode } = useThemeContext();

  const handleAdoptPet = async (id: string) => {
    setLoading(true);

    try {
      if (!userId) {
        push("/login");
        throw new Error("You must be logged in to adopt a pet");
      }

      const success = await updatePetOwner(id, userId);

      if (!success) {
        throw new Error("Error adopting pet");
      }

      MakeSuccessToast("Pet adopted successfully", mode);
      push("/pets");
    } catch (error) {
      MakeErrorToast(
        error instanceof Error ? error.message : "An error occured",
        mode
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      fullWidth
      onClick={() => handleAdoptPet(id)}
      sx={{
        marginTop: "16px",
      }}
      loading={loading}
    >
      Adopt
    </Button>
  );
};

export default AdoptPetButton;
