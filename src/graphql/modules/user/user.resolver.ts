import { GraphQLContext } from "../../context/context";
import { ICreateUser,  IUpdateUser } from "./types";
import UserService from "./user.services";

const queries = {
  _empty: (_: unknown, _args: unknown, context: GraphQLContext) => `Faizan`,
};

const mutations = {
  createUser: async (
    _: unknown,
    payload: ICreateUser,
    context: GraphQLContext,
  ) => {
    const res = await UserService.createUser(payload);
    return res.id;
  },

  updateUser : async (
    _: unknown,
    payload: IUpdateUser,
    context: GraphQLContext,
  ) => {
    const res = await UserService.updateUser(payload);
    return res;
  }, 
  deleteUser : async (
    _: unknown,
    {id}: {id:string},
    context: GraphQLContext,
  ) => {
    const res = await UserService.deleteUser(id);
    return "User Successfully Deleted";
  }, 

  _empty: (_: unknown, _args: unknown, context: GraphQLContext) => `Faizan`,
};

export const userResolvers = { queries, mutations };
