import { Box } from "@mui/material";
import { getPetsWithPagination } from "@/actions/pet/actions";
import { getUserSession } from "@/actions/auth/actions";
import PetList from "./PetList";

type PetSectionProps = {
  query?: string;
  currentPage?: number;
};

const PetSection = async ({ query, currentPage = 1 }: PetSectionProps) => {
  const pageSize = 4;
  const { pets, total } = await getPetsWithPagination(
    query,
    currentPage,
    pageSize
  );
  const totalPages = Math.ceil(total / pageSize);

  const session = await getUserSession();
  const userId = session?.user?.id;

  return (
    <Box width="100%">
      <PetList
        userId={userId}
        pets={pets}
        currentPage={currentPage}
        query={query}
        totalPages={totalPages}
      />
    </Box>
  );
};

export default PetSection;
