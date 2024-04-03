import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as authSchema from "@/db/schema/auth";
import * as quizSchema from "@/db/schema/quiz";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client, { schema: { ...authSchema, ...quizSchema } });
