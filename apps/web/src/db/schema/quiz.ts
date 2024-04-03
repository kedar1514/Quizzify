import {
  timestamp,
  pgTable,
  text,
  integer,
  boolean,
  serial
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./auth";

export const quizzes = pgTable('quizzes', {
  id: serial("id").primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  host_id: text('host_id').notNull().references(() => users.id),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export const questions = pgTable('questions', {
  id: serial("id").primaryKey(),
  quiz_id: integer('quiz_id').notNull().references(() => quizzes.id),
  question_text: text('question_text').notNull(),
  question_type: text('question_type').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export const options = pgTable('options', {
  id: serial("id").primaryKey(),
  question_id: integer('question_id').notNull().references(() => questions.id),
  option_text: text('option_text').notNull(),
  is_correct: boolean('is_correct').notNull(),
});

export const participants = pgTable('participants', {
  id: serial("id").primaryKey(),
  quiz_id: integer('quiz_id').notNull().references(() => quizzes.id),
  user_id: text('user_id').references(() => users.id),
  is_temporary: boolean('is_temporary').notNull(),
});

export const responses = pgTable('responses', {
  id: serial("id").primaryKey(),
  question_id: integer('question_id').notNull().references(() => questions.id),
  option_id: integer('option_id').notNull().references(() => options.id),
  participant_id: integer('participant_id').notNull().references(() => participants.id),
  created_at: timestamp('created_at').notNull().defaultNow(),
});


// //////////////////////////////////////////RELATIONS///////////////////////////////

// export const usersRelation = relations(users, ({ one, many }) => ({
//   quizzes: many(quizzes)
// }));

// export const quizzesRelation = relations(quizzes, ({ one, many }) => ({
//   host: one(users, {
//     fields: [quizzes.host_id],
//     references: [users.id],
//   }),
//   questions: many(questions),
//   participants: many(participants)
// }));

// export const questionsRelation = relations(questions, ({ one, many }) => ({
//   quizz: one(quizzes, {
//     fields: [questions.quiz_id],
//     references: [quizzes.id],
//   }),
//   options: many(options),
//   responsesByUsers: many(responses)
// }));

// export const optionsRelation = relations(options, ({ one, many }) => ({
//   question: one(questions, {
//     fields: [options.question_id],
//     references: [questions.id],
//   })
// }));

// export const participantsRelation = relations( participants, ({ one, many }) => ({
//     user: one(users, {
//       fields: [participants.user_id],
//       references: [users.id],
//     }),
//     responses: many(responses)
// }));

// export const responsesRelation = relations( responses, ({ one, many }) => ({
//   question: one(questions, {
//     fields: [responses.question_id],
//     references: [questions.id],
//   }),
//   participants: one(participants, {
//     fields: [responses.participant_id],
//     references: [participants.id],
//   }),
// }));