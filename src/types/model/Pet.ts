export type Pet = {
  id: string;
  name: string;
  image?: string | File;
  species: string;
  breed: string;
  gender: string;
  age: number;
  date_of_birth?: Date;
  owner_id?: string;
  added_by: string;
  created_at?: Date;
  updated_at?: Date;
};
