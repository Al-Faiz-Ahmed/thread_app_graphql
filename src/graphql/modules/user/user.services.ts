import { createHmac, randomBytes } from "node:crypto";
import type { User } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/config/prisma-config";
import type { ICreateUser, IDeleteUser, IUpdateUser } from "./types";
import { vCreateUser } from "./schema.validation";

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
    const { firstName, lastName, email, password, username } = payload;

    const response = vCreateUser.safeParse({ payload });

    if (response.success) {
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
      payload;
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

  public static deleteUser(payload: IDeleteUser) {
    const { id } = payload;
    return prisma.user.delete({
      /* id = id */
      where: { id },
    });
  }
}

export default UserService;
