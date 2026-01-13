import gql from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String
    lastName: String
    email: String!
    profileImageURL: String
    password: String!
    salt: String!
  }

  type BrowserUser {
    id: ID!
    username: String!
    firstName: String
    lastName: String
    email: String!
    profileImageURL: String
  }

  input CreateUserInput {
    firstName: String
    lastName: String
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    id: ID!
    firstName: String
    lastName: String
    username: String!
    profileImageURL: String
  }
`;
