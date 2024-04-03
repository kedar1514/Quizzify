// import "dotenv/config";
// import type { Config } from "drizzle-kit";

// export default {
//   schema: "./src/db/schema/*",
//   out: "./src/db/migrations",
//   driver: "pg",
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL!,
//   },
// } satisfies Config;

import { Config } from "drizzle-kit"

import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export default {
  schema: "./src/db/schema/*",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  out: "./src/db/migrations",
} satisfies Config
