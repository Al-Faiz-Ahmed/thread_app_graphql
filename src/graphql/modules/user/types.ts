import { User } from "../../../generated/prisma/client";

export interface ICreateUser {
  input: Omit<User, "id" | "salt" | "profileImageURL">;
}

export interface IUpdateUser {
  input: Pick<
    User,
    "id" | "username" | "firstName" | "lastName" | "profileImageURL"
  >;
}
