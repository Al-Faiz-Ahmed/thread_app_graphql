import { createHmac, randomBytes } from "node:crypto";
import type { User } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/config/prisma-config";
import type { ICreateUser, IUpdateUser } from "./types";

class UserService {
  private static createSalt() {
    return randomBytes(32).toString("hex");
  }

  private static createHashedPassword({
    salt,
    password,
  }: {
    salt: string;
    password: string;
  }) {
    return createHmac("sha256", salt).update(password).digest("hex");
  }

  public static createUser(payload: ICreateUser) {
    const { firstName, lastName, email, password, username } = payload.input;
    const salt = this.createSalt();
    const hashedPassword = this.createHashedPassword({ salt, password });

    return prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        profileImageURL: "",
        password: hashedPassword,
        salt,
      },
    });
  }

  public static updateUser(payload: IUpdateUser) {
    const { firstName, lastName, username, profileImageURL, id } =
      payload.input;
    return prisma.user.update({
      data: {
        firstName,
        lastName,
        username,
        profileImageURL,
      },
      /* id = id */
      where: { id },
    });
  }
}

export default UserService;
