import { Pet } from "@/types/model/Pet";
import { Avatar, TableBody, TableCell, TableRow } from "@mui/material";
import Image from "next/image";

type PetTableBodyProps = {
  pets: Pet[] | null;
};

const PetTableBody = ({ pets }: PetTableBodyProps) => {
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
                {/* {pet.image ? (
                  <Image
                    src={pet.image.}
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
                )} */}
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
                {pet.owner_id}
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
                {pet.created_at ? new Date(pet.created_at).toLocaleDateString() : "-"}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {pet.updated_at ? new Date(pet.updated_at).toLocaleDateString() : "-"}
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
    </>
  );
};

export default PetTableBody;
