"use client";

import { Pet } from "@/types/model/Pet";
import { Male, Female } from "@mui/icons-material";
import {
  Grid2,
  Card,
  CardContent,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import PetModal from "./PetModal";

type PetCardProps = {
  pet: Pet;
  userId?: string;
};

const PetCard = ({ pet, userId }: PetCardProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Grid2
        key={pet.id}
        size={{
          xs: 12,
          sm: 6,
          md: 3,
        }}
        sx={{
          backgroundColor: "background.paper",
          borderRadius: "8px",
          transition: "hover 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
            cursor: "pointer",
          },
        }}
        onClick={() => setOpen(true)}
      >
        <Card sx={{ borderRadius: "8px" }}>
          <CardContent>
            <Image
              src={pet.image as string}
              width={500}
              height={500}
              alt={`${pet.name}'s Picture`}
              style={{
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
                maxHeight: "300px",
                borderRadius: "8px",
              }}
            />
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              sx={{ marginTop: "12px" }}
            >
              <Box>
                <Typography
                  color="text.primary"
                  fontSize="18px"
                  fontWeight={600}
                >
                  {pet.name}
                </Typography>
                <Typography color="gray" fontSize="14px" fontWeight={500}>
                  {pet.species}
                </Typography>
              </Box>
              {pet.gender === "Male" ? (
                <Box sx={{ color: "#08aec8" }}>
                  <Male />
                </Box>
              ) : (
                <Box sx={{ color: "#d95a94" }}>
                  <Female />
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Grid2>

      <PetModal pet={pet} userId={userId} open={open} setOpen={setOpen} />
    </>
  );
};

export default PetCard;
