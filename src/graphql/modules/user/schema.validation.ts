import * as z from "zod";
import { ICreateUser } from "./types";

export const vCreateUser = z.object({
  email: z.email(),
  firstName: z.string().nullable(),
  lastName:z.string().nullable(),
  password:z.string().min(8,'password must be 8 charachters'),
  username:z.string()
}) satisfies z.ZodType<ICreateUser>;


