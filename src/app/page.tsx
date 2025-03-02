import Banner from "@/components/home/Banner";
import NewestPetsSection from "@/components/home/NewestPetsSection";
import { Box, Button, Container, Stack } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Container
      maxWidth="xl"
      className="with-header"
      sx={{ marginBottom: "64px" }}
    >
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Banner />
      </Stack>
      <NewestPetsSection />

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginTop: "40px",
        }}
      >
        <Link href="/pets" passHref>
          <Button variant="contained" color="primary">
            View All Pets
          </Button>
        </Link>
      </Stack>
    </Container>
  );
}
