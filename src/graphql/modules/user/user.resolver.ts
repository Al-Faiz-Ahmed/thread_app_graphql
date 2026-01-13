import { GraphQLContext } from "../../context/context";
import { ICreateUser } from "./types";
import UserService from "./user.services";

const queries = {
  _empty: (_: unknown, _args: unknown, context: GraphQLContext) => `Faizan`,
};

const mutations = {
  createUser : async (_: unknown, payload: ICreateUser, context: GraphQLContext) => {
    console.log("I am geting here")
    
      const res = await UserService.createUser(payload)
   
      return res.id
  },
  _empty: (_: unknown, _args: unknown, context: GraphQLContext) => `Faizan`,
};

export const userResolvers = { queries, mutations };
