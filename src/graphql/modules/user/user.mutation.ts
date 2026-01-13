import gql from "graphql-tag";

export const userMutationDefs = gql`
  extend type Mutation {
    createUser(input: CreateUserInput!): String!

    _empty: String!
  }
`;
