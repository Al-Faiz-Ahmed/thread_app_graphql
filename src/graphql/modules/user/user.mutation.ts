import gql from "graphql-tag";

export const userMutationDefs = gql`
  extend type Mutation {
    createUser(input: CreateUserInput!): String!

    updateUser(input: UpdateUserInput!): BrowserUser!

    deleteUser(id: String! ): String!

    _empty: String!
  }
`;
