export type Pet = {
  id: string;
  name: string;
  species: string;
  breed: string;
  gender: string;
  age: number;
  dateOfBirth?: Date;
  ownerId?: string
  addedBy: string;
  createdAt: Date;
  updatedAt: Date;
}