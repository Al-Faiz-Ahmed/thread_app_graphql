import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/dist/server";
import cors from "cors";
import { createGraphQLHandler } from "./graphql";
import { globalMiddleWareController } from "./middleware/global";
import {config} from './lib/env-config'

const app = express();

globalMiddleWareController(app);

app.get("/", (req, res) => {
  res.type(".html");
  res.send("<h1>Server is working</h1>");
});

app.get("/graphql", (req, res) => {
  res.type("html");
  res.end(
    ruruHTML({
      endpoint: "/graphql",
    }),
  );
});

app.post("/graphql", createGraphQLHandler);

app.listen(config.PORT, () => {
  console.log(`Serever Started on http://localhost:${config.PORT}`);
});

// function allMiddleWare(app) {
//   app.use(express.json());
//   app.use(cors());
// }
