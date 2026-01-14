import express, { type Request, type Response } from "express";
import { createYoga, YogaInitialContext } from "graphql-yoga";
import { globalMiddleWareController } from "./middleware/global";
import { config } from "./lib/config/env-config";
import {schema} from "./graphql"
import { createContext } from "./graphql/context/context";


const app = express();
const yoga = createYoga({
  schema,
  graphiql: true,
  context : async ({request}) => createContext(request),
  
});

globalMiddleWareController(app);

app.get("/", (_req, res) => {
  res.type("html");
  res.send(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Thread App GraphQL Server</title>
      <style>
        :root {
          color-scheme: light;
          font-family: "Space Grotesk", "Segoe UI", system-ui, sans-serif;
          --bg: radial-gradient(circle at top, #f6f7ff, #e8ecff, #fdfbff);
          --text: #1c2333;
          --muted: #5b6480;
          --accent: #4b66ff;
          --accent-dark: #3241cc;
        }
        body {
          margin: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          color: var(--text);
        }
        main {
          width: min(640px, 90vw);
          padding: 3rem;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 25px 60px rgba(68, 77, 136, 0.15);
          text-align: center;
        }
        h1 {
          font-size: clamp(2rem, 4vw, 2.75rem);
          margin-bottom: 0.75rem;
        }
        p {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--muted);
          margin: 0 auto 1.5rem;
        }
        a.cta {
          display: inline-flex;
          gap: 0.5rem;
          align-items: center;
          padding: 0.9rem 1.75rem;
          background: var(--accent);
          color: #fff;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 600;
          transition: transform 180ms ease, background 180ms ease;
        }
        a.cta:hover {
          transform: translateY(-1px);
          background: var(--accent-dark);
        }
      </style>
    </head>
    <body>
      <main>
        <h1>Thread App GraphQL API</h1>
        <p>
          The Express + Yoga server is running smoothly. Use the GraphQL playground to explore the schema,
          run queries and mutations, or integrate with your client of choice.
        </p>
        <a class="cta" href="/graphql">Launch GraphQL Playground →</a>
      </main>
    </body>
  </html>`);
});


app.use("/graphql", yoga);

app.listen(config.PORT, () => {
  console.log(`Serever Started on http://localhost:${config.PORT}`);
});

