import express from "express";
// import { buildSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/dist/server";
import cors from "cors";

const PORT = 4000;

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





// app.post(
//   "/graphql",
//   createHandler({
//     schema: schema,
//   }),
// );

// app.listen(PORT, () => {
//   console.log(`Serever Started on http://localhost:${PORT}`);
// });

// function allMiddleWare(app) {
//   app.use(express.json());
//   app.use(cors());
// }
