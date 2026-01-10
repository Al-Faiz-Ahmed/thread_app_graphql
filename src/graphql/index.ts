import { makeExecutableSchema } from "@graphql-tools/schema";
import { createHandler } from "graphql-http/lib/use/express";
import { resolvers, typeDefs } from "./schema";

// const typeDefs = `#grahql 
  
//   type Query {
//     greeting: String!
//   }
  
//   `;

// const resolvers = {
//   Query: {
//     greeting: () => `Hello Faizan Created this`,
//   },
// };

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


export const createGraphQLHandler = () => {
    return  createHandler({
    schema: schema,
  })
}



