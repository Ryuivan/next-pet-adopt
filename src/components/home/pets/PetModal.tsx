import { Pet } from "@/types/model/Pet";
import { Box, Modal, Typography, Stack } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import AdoptPetButton from "./AdoptPetButton";

type PetModalProps = {
  pet: Pet;
  userId?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const PetModal = ({ pet, userId, open, setOpen }: PetModalProps) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          padding: 4,
          color: "text.primary",
          borderRadius: "8px",
        }}
      >
        <Typography
          id="pet-name"
          fontSize="20px"
          fontWeight={600}
          textAlign="center"
        >
          {pet.name}
        </Typography>

        <Box sx={{ mt: "12px" }}>
          {[
            { label: "Species", value: pet.species },
            { label: "Breed", value: pet.breed },
            { label: "Gender", value: pet.gender },
            { label: "Age", value: pet.age },
            pet.date_of_birth && {
              label: "Date of Birth",
              value: new Date(pet.date_of_birth).toLocaleDateString(),
            },
          ]
            .filter(Boolean)
            .map(
              (item, index) =>
                item && (
                  <Stack
                    key={index}
                    direction="row"
                    justifyContent="space-between"
                    sx={{ fontSize: "16px", fontWeight: 500, mb: 1 }}
                  >
                    <Typography color="text.primary" width={110}>
                      {item.label}:
                    </Typography>
                    <Typography
                      color="text.primary"
                      textAlign="start"
                      flex={1}
                      fontWeight={500}
                    >
                      {item.value}
                    </Typography>
                  </Stack>
                )
            )}
        </Box>

        <AdoptPetButton id={pet.id} userId={userId} />
      </Box>
    </Modal>
  );
};

export default PetModal;
