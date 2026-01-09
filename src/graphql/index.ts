import { makeExecutableSchema } from "@graphql-tools/schema";
import { createHandler } from "graphql-http/lib/use/express";

const typeDefs = `#graphql
  
  type Query {
    greeting: String!
  }
  
  `;

const resolvers = {
  Query: {
    greeting: () => `Hello Faizan Created this`,
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


export const createGraphQLHandler = () => {
    return  createHandler({
    schema: schema,
  })
}



