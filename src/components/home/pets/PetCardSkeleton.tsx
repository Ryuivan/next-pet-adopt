import { Grid2, Skeleton } from "@mui/material";

const PetCardSkeleton = () => {
  return (
    <Grid2
      size={{
        xs: 12,
        sm: 6,
        md: 3,
      }}
      sx={{
        backgroundColor: "background.paper",
        borderRadius: "8px",
      }}
    >
      <Skeleton
        variant="rounded"
        animation="wave"
        width="100%"
        height="300px"
      />
    </Grid2>
  );
};

export default PetCardSkeleton;
