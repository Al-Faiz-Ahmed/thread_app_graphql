
import { resolvers } from "./resolvers";
import { schemaTypeDefs } from "./schema";
import { createSchema } from "graphql-yoga";


export const schema = createSchema({
  typeDefs:schemaTypeDefs,
  resolvers,
});


// export const createGraphQLHandler = () => {
//     return  createHandler({
//     schema: schema,
//   })
// }


