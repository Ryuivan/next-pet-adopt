"use client";

import { Pet } from "@/types/model/Pet";
import { Grid2, Pagination, Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import PetCard from "../home/pets/PetCard";
import PetCardSkeleton from "../home/pets/PetCardSkeleton";

type PetListProps = {
  pets: Pet[] | null;
  userId?: string;
  query?: string;
  currentPage: number;
  totalPages: number;
};

const PetList = ({
  pets,
  userId,
  query,
  currentPage,
  totalPages,
}: PetListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    // Pastikan `query` tetap ada jika sebelumnya ada
    if (query) params.set("query", query);

    // Push URL baru tanpa refresh
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {pets && (
        <>
          <Grid2 container spacing={2}>
            {pets.map((pet) => (
              <Suspense key={pet.id} fallback={<PetCardSkeleton />}>
                <PetCard pet={pet} userId={userId} />
              </Suspense>
            ))}
          </Grid2>

          <Stack
            direction="row"
            justifyContent="center"
            sx={{
              marginTop: "60px",
            }}
          >
            <Pagination
              shape="rounded"
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => onPageChange(page)}
            />
          </Stack>
        </>
      )}
    </>
  );
};

export default PetList;
