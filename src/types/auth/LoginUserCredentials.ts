import { User } from "../model/User";

export type LoginUserCredentials = Pick<User, "email"> & {
  password: string;
};
