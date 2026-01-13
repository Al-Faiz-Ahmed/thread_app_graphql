import { User } from "../../../generated/prisma/client";


export type ICreateUser = { input: Omit<User, "id" | "salt" | "profileImageURL"> };