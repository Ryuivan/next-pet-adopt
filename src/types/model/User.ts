export type User = {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  created_at: Date;
  updated_at: Date;
};
