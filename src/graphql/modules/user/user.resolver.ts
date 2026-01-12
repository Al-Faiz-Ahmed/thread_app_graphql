import { GraphQLContext } from "../../context/context";

export const userResolvers = {
  Query: {
    _empty: (_:unknown, _args:unknown, context:GraphQLContext) => `Faizan`,
  },

  Mutation: {
    _empty: (_:unknown, _args:unknown, context:GraphQLContext) => `Faizan`,
  },
}
