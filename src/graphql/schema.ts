import { User } from "./users";

const typeDefs = `
  

  type Query {
    ${User.queries}
   }
    
    type Mutation {
    ${User.mutations}
    }


  `;

const resolvers = {
  Query: {
    ...User.resolvers.queries
  },
  Mutation: {
     ...User.resolvers.mutations
  },
};

export { typeDefs, resolvers };
