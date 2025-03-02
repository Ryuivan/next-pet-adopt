"use client";

import { deletePet } from "@/actions/pet/actions";
import DeleteDialog from "@/components/ui/dialog/DeleteDialog";
import { useThemeContext } from "@/context/ThemeContext";
import { Pet } from "@/types/model/Pet";
import { MakeErrorToast, MakeSuccessToast } from "@/utils/toast/Toast";
import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type PetTableBodyProps = {
  pets: Pet[] | null;
};

const PetTableBody = ({ pets }: PetTableBodyProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const { mode } = useThemeContext();

  const handleOpen = (pet: Pet) => {
    setSelectedPet(pet);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPet(null);
  };

  const handleDeletePet = async () => {
    if (selectedPet) {
      const success = await deletePet(selectedPet);
      if (success) {
        MakeSuccessToast("Pet deleted successfully", mode);
      } else {
        MakeErrorToast("Failed to delete pet", mode);
      }
    }
    handleClose();
  };

  return (
    <>
      <TableBody>
        {pets && pets.length > 0 ? (
          pets.map((pet: Pet) => (
            <TableRow
              key={pet.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  textAlign: "left",
                }}
              >
                {pet.name}
              </TableCell>
              <TableCell>
                <Stack
                  width="100%"
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  {pet.image ? (
                    <Image
                      src={pet.image as string}
                      alt={`${pet.name}'s Image`}
                      width={40}
                      height={40}
                    />
                  ) : (
                    <Avatar
                      alt={`${pet.name}'s Image`}
                      sx={{
                        width: 40,
                        height: 40,
                      }}
                    >
                      {pet.name.charAt(0).toUpperCase()}
                    </Avatar>
                  )}
                </Stack>
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {pet.species}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {pet.breed}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {pet.gender}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {pet.age}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {pet.date_of_birth
                  ? new Date(pet.date_of_birth).toLocaleDateString()
                  : "-"}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {pet.owner_id ? pet.owner_id : "-"}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {pet.added_by}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {pet.created_at
                  ? new Date(pet.created_at).toLocaleDateString()
                  : "-"}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {pet.updated_at
                  ? new Date(pet.updated_at).toLocaleDateString()
                  : "-"}
              </TableCell>

              <TableCell
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Link href={`/dashboard/pets/${pet.id}/edit`} passHref>
                    <IconButton aria-label="edit" color="warning">
                      <Edit />
                    </IconButton>
                  </Link>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => handleOpen(pet)}
                  >
                    <Delete />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} align="center">
              No pets found
            </TableCell>
          </TableRow>
        )}
      </TableBody>

      <DeleteDialog
        open={open}
        title="Delete Pet"
        description={`Are you sure you want to delete pet "${selectedPet?.name}"?`}
        onClose={handleClose}
        onConfirm={handleDeletePet}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default PetTableBody;
