import { User } from "../model/User";

export type ForgotPasswordUserCredentials = Pick<User, "email">;