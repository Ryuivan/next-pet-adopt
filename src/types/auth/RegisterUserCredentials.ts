import { User } from "../model/User";

export type RegisterUserCredentials = Pick<User, "username" | "email"> & {
  password: string;
};
