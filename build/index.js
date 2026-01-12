import express from "express";
import { createYoga } from "graphql-yoga";
import { globalMiddleWareController } from "./middleware/global.js";
import { config } from "./lib/config/env-config.js";
import { schema } from "./graphql/index.js";
import { createContext } from "./graphql/context/context.js";
const app = express();
const yoga = createYoga({
    schema,
    graphiql: true,
    context: async ({ request }) => createContext(request),
});
globalMiddleWareController(app);
app.get("/", (req, res) => {
    res.type(".html");
    res.send("<h1>Server is working</h1>");
});
// app.get("/graphql", (req, res) => {
//   res.type("html");
//   res.end(
//     ruruHTML({
//       endpoint: "/graphql",
//     }),
//   );
// });
app.use("/graphql", yoga);
app.listen(config.PORT, () => {
    console.log(`Serever Started on http://localhost:${config.PORT}`);
});
// function allMiddleWare(app) {
//   app.use(express.json());
//   app.use(cors());
// }
