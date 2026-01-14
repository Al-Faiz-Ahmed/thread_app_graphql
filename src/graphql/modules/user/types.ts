import { User } from "../../../generated/prisma/client";

// input
export type ICreateUser = Omit<User, "id" | "salt" | "profileImageURL">;

export type IUpdateUser = Pick<
  User,
  "id" | "username" | "firstName" | "lastName" | "profileImageURL"
>;

export type IDeleteUser = {
  id: string;
};
