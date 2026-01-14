import { createHmac, randomBytes } from "node:crypto";
import type { User } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/config/prisma-config";
import type { ICreateUser, IDeleteUser, IUpdateUser } from "./types";
import { vCreateUser } from "./schema.validation";
import { ValidationError } from "../../../error/validation-error";
import { GraphQLError } from "graphql";

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
    console.log({ payload });
    const response = vCreateUser.safeParse({ ...payload });

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
    } else {
      console.log(response.error.message);
      const schemaErr = response.error.issues[0]?.message || "Error found in schema"
      throw new GraphQLError(schemaErr, {
        extensions: {
          code: "VALIDATION_ERROR",
        },
      });
      // throw new ValidationError(response.error.issues[0]?.message || "Error found in schema")
    }
  }

  public static updateUser(payload: IUpdateUser) {
    const { firstName, lastName, username, profileImageURL, id } = payload;
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
